import CommonHeader from "@/components/commonHeader";
export default function WatchListLayout({ children }) {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
}
