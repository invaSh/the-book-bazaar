export const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-creamParchment p-6">
      {children}
    </main>
  );
};