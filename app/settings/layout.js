import CommonHeader from "@/components/commonHeader";
export default function SettingsLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
