import CommonHeader from "@/components/commonHeader";
export default function SearchLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
