interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      {children}
    </div>
  );
};

export default LayoutPage;
