import os, sys, shutil, subprocess
from PIL import Image, ImageDraw

base_dir = os.path.abspath('scratch/android_project')
if os.path.exists(base_dir):
    shutil.rmtree(base_dir)

os.makedirs(os.path.join(base_dir, 'res/values'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'res/layout'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'src/agency/desimuchads/app'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'gen'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'bin'), exist_ok=True)

# 1. AndroidManifest.xml
manifest_content = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="agency.desimuchads.app"
    android:versionCode="24"
    android:versionName="2.4.0">

    <uses-sdk
        android:minSdkVersion="21"
        android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:windowSoftInputMode="adjustResize"
            android:theme="@style/AppTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"""
with open(os.path.join(base_dir, 'AndroidManifest.xml'), 'w', encoding='utf-8') as f:
    f.write(manifest_content)

# 2. strings.xml
strings_content = """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Desi Muchads</string>
</resources>
"""
with open(os.path.join(base_dir, 'res/values/strings.xml'), 'w', encoding='utf-8') as f:
    f.write(strings_content)

# 3. colors.xml
colors_content = """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary">#080807</color>
    <color name="primary_dark">#050504</color>
    <color name="accent">#D4AF37</color>
    <color name="background">#080807</color>
</resources>
"""
with open(os.path.join(base_dir, 'res/values/colors.xml'), 'w', encoding='utf-8') as f:
    f.write(colors_content)

# 4. styles.xml
styles_content = """<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="@android:style/Theme.Material.NoActionBar">
        <item name="android:colorPrimary">@color/primary</item>
        <item name="android:colorPrimaryDark">@color/primary_dark</item>
        <item name="android:colorAccent">@color/accent</item>
        <item name="android:windowBackground">@color/background</item>
        <item name="android:statusBarColor">@color/primary</item>
        <item name="android:navigationBarColor">@color/primary</item>
    </style>
</resources>
"""
with open(os.path.join(base_dir, 'res/values/styles.xml'), 'w', encoding='utf-8') as f:
    f.write(styles_content)

# 5. activity_main.xml
layout_content = """<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#080807">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <ProgressBar
        android:id="@+id/progress_bar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="3dp"
        android:max="100"
        android:progressTint="#D4AF37"
        android:visibility="gone" />

</FrameLayout>
"""
with open(os.path.join(base_dir, 'res/layout/activity_main.xml'), 'w', encoding='utf-8') as f:
    f.write(layout_content)

# 6. Generate icons
logo_path = os.path.abspath('public/desi-muchads-square-logo.png')
src_im = Image.open(logo_path).convert('RGBA')

densities = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
}

for folder, size in densities.items():
    folder_path = os.path.join(base_dir, 'res', folder)
    os.makedirs(folder_path, exist_ok=True)
    
    # Square launcher
    sq = src_im.resize((size, size), Image.Resampling.LANCZOS)
    sq.save(os.path.join(folder_path, 'ic_launcher.png'), 'PNG')
    
    # Round launcher
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    
    round_im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    round_im.paste(sq, (0, 0), mask=mask)
    round_im.save(os.path.join(folder_path, 'ic_launcher_round.png'), 'PNG')

# 7. MainActivity.java
java_content = """package agency.desimuchads.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private WebView mWebView;
    private ProgressBar mProgressBar;
    private static final String HOME_URL = "https://desimuchads.agency";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = findViewById(R.id.webview);
        mProgressBar = findViewById(R.id.progress_bar);

        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " DesiMuchadsApp/2.4");

        mWebView.setBackgroundColor(0xFF080807);

        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (mProgressBar != null) {
                    if (newProgress < 100) {
                        mProgressBar.setVisibility(View.VISIBLE);
                        mProgressBar.setProgress(newProgress);
                    } else {
                        mProgressBar.setVisibility(View.GONE);
                    }
                }
            }
        });

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                return handleUri(uri);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUri(Uri.parse(url));
            }

            private boolean handleUri(Uri uri) {
                String scheme = uri.getScheme();
                String host = uri.getHost();

                if ("tel".equals(scheme) || "mailto".equals(scheme) || "whatsapp".equals(scheme)) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        return true;
                    }
                }

                if (host != null && (host.contains("whatsapp.com") || host.contains("wa.me") || host.contains("maps.app.goo.gl") || host.contains("google.com/maps"))) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                        startActivity(intent);
                        return true;
                    } catch (Exception e) {
                        return false;
                    }
                }

                return false;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }
        });

        if (savedInstanceState == null) {
            mWebView.loadUrl(HOME_URL);
        } else {
            mWebView.restoreState(savedInstanceState);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (mWebView != null) {
            mWebView.saveState(outState);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
"""
with open(os.path.join(base_dir, 'src/agency/desimuchads/app/MainActivity.java'), 'w', encoding='utf-8') as f:
    f.write(java_content)

print('Android project skeleton created successfully at:', base_dir)
