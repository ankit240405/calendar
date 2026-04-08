const THEMES = [
  { id: "light", label: "Light", bg: "bg-white border border-gray-300" },
  { id: "dark",  label: "Dark",  bg: "bg-gray-900" },
  { id: "warm",  label: "Warm",  bg: "bg-amber-100 border border-amber-300" },
];

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex gap-1.5 items-center">
      {THEMES.map((t) => (
        <button
          key={t.id}
          title={t.label}
          onClick={() => setTheme(t.id)}
          className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${t.bg} ${
            theme === t.id ? "ring-2 ring-emerald-500 ring-offset-1" : ""
          }`}
        />
      ))}
    </div>
  );
}
