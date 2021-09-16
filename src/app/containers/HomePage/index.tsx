import BaseRouting from './BaseRouting';
import LayoutWithHeaderFooterSidebar from 'app/components/LayoutWithHeadeSidebar';

export default function HomePage() {
  return (
    <LayoutWithHeaderFooterSidebar>
      <BaseRouting />
    </LayoutWithHeaderFooterSidebar>
  );
}
