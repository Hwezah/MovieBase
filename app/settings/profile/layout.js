import CommonHeader from "@/components/commonHeader";
export default function ProfileLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
