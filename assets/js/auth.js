// assets/js/auth.js

// If auth.js runs twice for ANY reason, don't redeclare with const.
window.SUPABASE_URL = window.SUPABASE_URL || "https://vnyvtomlbhtglzzyokbc.supabase.co";
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZueXZ0b21sYmh0Z2x6enlva2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzM1MDMsImV4cCI6MjA4NzA0OTUwM30.BgG_cD6a1hblUZ4b-xYIGEvwwsBW6dZ5zoxuGV_SLAU";


// Create the client once
window.supabaseClient =
  window.supabaseClient || window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

// Expose functions globally once
window.signUp =
  window.signUp ||
  (async (email, password) => {
    const { data, error } = await window.supabaseClient.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  });

window.signIn =
  window.signIn ||
  (async (email, password) => {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  });

window.signOut =
  window.signOut ||
  (async () => {
    await window.supabaseClient.auth.signOut();
  });

window.getSession =
  window.getSession ||
  (async () => {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    return session;
  });

window.requireAuth =
  window.requireAuth ||
  (async (redirectTo = "login.html") => {
    const session = await window.getSession();
    if (!session) window.location.href = redirectTo;
    return session;
  });

console.log("auth.js loaded; signUp is", typeof window.signUp);
