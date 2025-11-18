#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            use tauri::Manager;
            let window = app.get_webview_window("main").expect("no window labeled 'main' found");
            window.open_devtools();  // ← теперь скомпилируется

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}