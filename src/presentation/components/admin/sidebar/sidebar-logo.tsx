import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 pl-7 pr-6 pt-8">
      <RaksaLogo variant="white" height={34} />
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B79CFF]">
        Superadmin
      </span>
    </div>
  );
}
