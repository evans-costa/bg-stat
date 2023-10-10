import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-auto mx-auto text-slate-100">
      <Header />
      {children}
    </div>
  );
}
