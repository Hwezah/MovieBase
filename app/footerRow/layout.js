import CommonHeader from "@/components/commonHeader";
export default function FooterLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
