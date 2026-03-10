import CommonHeader from "@/components/commonHeader";
export default function DownloadLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
