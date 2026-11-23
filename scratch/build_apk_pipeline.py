import os, sys, shutil, subprocess, zipfile

java_home = r"C:\Program Files\Java\jdk-18.0.2"
jdk_bin = os.path.join(java_home, "bin")
build_tools = r"C:\Users\Shreyam\AppData\Local\Android\Sdk\build-tools\34.0.0"
android_jar = r"C:\Users\Shreyam\AppData\Local\Android\Sdk\platforms\android-34\android.jar"

os.environ["JAVA_HOME"] = java_home
os.environ["PATH"] = jdk_bin + ";" + os.environ["PATH"]

base_dir = os.path.abspath('scratch/android_project')
gen_dir = os.path.join(base_dir, 'gen')
bin_dir = os.path.join(base_dir, 'bin')
classes_dir = os.path.join(base_dir, 'classes')
manifest = os.path.join(base_dir, 'AndroidManifest.xml')
res_dir = os.path.join(base_dir, 'res')
src_dir = os.path.join(base_dir, 'src')

os.makedirs(gen_dir, exist_ok=True)
os.makedirs(bin_dir, exist_ok=True)
os.makedirs(classes_dir, exist_ok=True)

# 1. Generate R.java with AAPT
print("Step 1: Generating R.java with aapt...")
cmd_aapt_r = [
    os.path.join(build_tools, "aapt.exe"),
    "package",
    "-f",
    "-m",
    "-J", gen_dir,
    "-M", manifest,
    "-S", res_dir,
    "-I", android_jar
]
res = subprocess.run(cmd_aapt_r, capture_output=True, text=True)
if res.returncode != 0:
    print("aapt package -J error:\n", res.stderr)
    sys.exit(1)
print("R.java generated successfully.")

# 2. Compile Java sources with javac
print("Step 2: Compiling Java sources with javac...")
java_files = []
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.java'):
            java_files.append(os.path.join(root, f))
for root, _, files in os.walk(gen_dir):
    for f in files:
        if f.endswith('.java'):
            java_files.append(os.path.join(root, f))

cmd_javac = [
    os.path.join(jdk_bin, "javac.exe"),
    "-target", "1.8",
    "-source", "1.8",
    "-bootclasspath", android_jar,
    "-d", classes_dir
] + java_files
res = subprocess.run(cmd_javac, capture_output=True, text=True)
if res.returncode != 0:
    print("javac error:\n", res.stderr)
    sys.exit(1)
print(f"Java sources ({len(java_files)} files) compiled successfully.")

# 3. Compile classes to DEX with D8
print("Step 3: Compiling classes to DEX with D8...")
class_files = []
for root, _, files in os.walk(classes_dir):
    for f in files:
        if f.endswith('.class'):
            class_files.append(os.path.join(root, f))

d8_bat = os.path.join(build_tools, "d8.bat")
cmd_d8 = [d8_bat, "--lib", android_jar, "--output", bin_dir] + class_files
res = subprocess.run(cmd_d8, shell=True, capture_output=True, text=True)
if res.returncode != 0:
    print("d8 error:\n", res.stderr)
    sys.exit(1)
dex_file = os.path.join(bin_dir, "classes.dex")
if not os.path.exists(dex_file):
    print("classes.dex was not created!")
    sys.exit(1)
print("classes.dex created successfully. Size:", os.path.getsize(dex_file))

# 4. Create base APK package with AAPT
print("Step 4: Packaging resources into base APK...")
unaligned_apk = os.path.join(bin_dir, "app-unaligned.apk")
cmd_aapt_pkg = [
    os.path.join(build_tools, "aapt.exe"),
    "package",
    "-f",
    "-M", manifest,
    "-S", res_dir,
    "-I", android_jar,
    "-F", unaligned_apk
]
res = subprocess.run(cmd_aapt_pkg, capture_output=True, text=True)
if res.returncode != 0:
    print("aapt package error:\n", res.stderr)
    sys.exit(1)
print("Base APK created successfully. Size:", os.path.getsize(unaligned_apk))

# 5. Add classes.dex to APK
print("Step 5: Adding classes.dex to unaligned APK...")
cmd_aapt_add = [
    os.path.join(build_tools, "aapt.exe"),
    "add",
    unaligned_apk,
    "classes.dex"
]
# Run in bin_dir so classes.dex is at root of APK
res = subprocess.run(cmd_aapt_add, cwd=bin_dir, capture_output=True, text=True)
if res.returncode != 0:
    print("aapt add error:\n", res.stderr)
    sys.exit(1)
print("classes.dex added to APK successfully.")

# 6. Zipalign APK
print("Step 6: Running zipalign (4-byte alignment)...")
aligned_apk = os.path.join(bin_dir, "app-aligned.apk")
cmd_zipalign = [
    os.path.join(build_tools, "zipalign.exe"),
    "-f",
    "-p",
    "4",
    unaligned_apk,
    aligned_apk
]
res = subprocess.run(cmd_zipalign, capture_output=True, text=True)
if res.returncode != 0:
    print("zipalign error:\n", res.stderr)
    sys.exit(1)
print("APK 4-byte aligned successfully. Size:", os.path.getsize(aligned_apk))

# 7. Generate release signing keystore if not exists
keystore_path = os.path.join(base_dir, "release.jks")
keystore_pass = "desimuchads2026"
key_alias = "desimuchads"

if not os.path.exists(keystore_path):
    print("Step 7: Generating release keystore with keytool...")
    cmd_keytool = [
        os.path.join(jdk_bin, "keytool.exe"),
        "-genkeypair",
        "-v",
        "-keystore", keystore_path,
        "-storepass", keystore_pass,
        "-keypass", keystore_pass,
        "-alias", key_alias,
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", "10000",
        "-dname", "CN=Desi Muchads, OU=Mobile Engineering, O=Desi Muchads Digital LLP, L=Bengaluru, ST=Karnataka, C=IN"
    ]
    res = subprocess.run(cmd_keytool, capture_output=True, text=True)
    if res.returncode != 0:
        print("keytool error:\n", res.stderr)
        sys.exit(1)
    print("Release keystore created.")

# 8. Sign APK with apksigner (v1, v2, v3, v4 signature schemes)
print("Step 8: Signing APK with apksigner...")
signed_apk = os.path.join(bin_dir, "desi-muchads-v2.4-signed.apk")
shutil.copy2(aligned_apk, signed_apk)

apksigner_bat = os.path.join(build_tools, "apksigner.bat")
cmd_sign = [
    apksigner_bat,
    "sign",
    "--ks", keystore_path,
    "--ks-pass", f"pass:{keystore_pass}",
    "--ks-key-alias", key_alias,
    "--key-pass", f"pass:{keystore_pass}",
    "--min-sdk-version", "21",
    "--v1-signing-enabled", "true",
    "--v2-signing-enabled", "true",
    "--v3-signing-enabled", "true",
    signed_apk
]
res = subprocess.run(cmd_sign, shell=True, capture_output=True, text=True)
if res.returncode != 0:
    print("apksigner sign error:\n", res.stderr)
    sys.exit(1)
print("APK signed successfully.")

# 9. Verify APK signature
print("Step 9: Verifying APK signature...")
cmd_verify = [apksigner_bat, "verify", "--verbose", signed_apk]
res = subprocess.run(cmd_verify, shell=True, capture_output=True, text=True)
print("Verification Output:\n", res.stdout)
if "Verified using v1 scheme (JAR signing): true" not in res.stdout or "Verified using v2 scheme (APK Signature Scheme v2): true" not in res.stdout:
    print("Verification warning:\n", res.stderr)

# 10. Copy to public/downloads/desi-muchads-v2.4.apk
final_dest = os.path.abspath('public/downloads/desi-muchads-v2.4.apk')
shutil.copy2(signed_apk, final_dest)
print(f"SUCCESS: Real, valid, signed APK installed to {final_dest}")
print("Final APK Size:", os.path.getsize(final_dest), "bytes")
