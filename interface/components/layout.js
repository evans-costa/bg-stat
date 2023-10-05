import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-auto mx-auto mb-24 text-slate-100">
      <Header />
      {children}
    </div>
  );
}
