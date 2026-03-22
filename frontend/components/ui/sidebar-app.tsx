import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type DisasterItem = {
  name: string
  url: string
  icon: React.ComponentType
}

export function AppSidebar({ disasters }: { disasters: DisasterItem[] }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="relative font-['Comic_Neue',cursive] border-4 border-black shadow-[8px_8px_0_#111] bg-white overflow-hidden ml-3 mt-3"
    >
      {/* Halftone dot texture layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* ── Header — speech-bubble style ── */}
      <SidebarHeader className="relative z-10 border-b-4 border-black bg-[#FFE600] px-4 py-3">
        {/* Speech-bubble pointer */}
        <div
          aria-hidden
          className="absolute -bottom-[14px] left-6 w-0 h-0 z-20"
          style={{
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "14px solid #111",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-[10px] left-[22px] w-0 h-0 z-20"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "11px solid #FFE600",
          }}
        />

        <span
          className="block text-4xl tracking-[0.12em] text-black uppercase leading-none"
          style={{
            fontFamily: "'Bangers', cursive",
            WebkitTextStroke: "1px #111",
            textShadow: "2px 2px 0 rgba(0,0,0,0.25)",
          }}
        >
          Sendoff
        </span>
        <span
          className="block text-[14px] font-bold uppercase tracking-widest text-black/60 mt-0.5"
          style={{ fontFamily: "'Bangers', cursive" }}
        >
          Disaster Response HQ
        </span>
      </SidebarHeader>

      {/* ── Nav items ── */}
      <SidebarContent className="relative z-10 pt-6">
        <SidebarGroup className="gap-2 px-3">
          {/* "MISSIONS" label — comic panel header */}
          <div
            className="mb-3 flex items-center gap-2"
          >
            <div className="h-[3px] flex-1 bg-black" />
            <span
              className="px-2 text-[18px] font-black uppercase tracking-[0.15em] text-black"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.2em" }}
            >
              Active Missions
            </span>
            <div className="h-[3px] flex-1 bg-black" />
          </div>

          <SidebarMenu className="gap-2">
            {disasters.map((disaster) => (
              <SidebarMenuItem key={disaster.name}>
                <SidebarMenuButton
                  asChild
                  className={[
                    "group relative flex items-center gap-3 rounded-none",
                    "border-2 border-black bg-white px-3 py-2.5",
                    "font-bold uppercase tracking-wide text-black",
                    "transition-all duration-75",
                    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111] hover:bg-[#FFE600]",
                    "data-[active=true]:-translate-x-0.5 data-[active=true]:-translate-y-0.5",
                    "data-[active=true]:shadow-[4px_4px_0_#111] data-[active=true]:bg-[#FF3B3B]",
                    "data-[active=true]:text-white",
                  ].join(" ")}
                >
                  <a href={disaster.url} className="flex items-center gap-3 w-full">
                    {/* Icon badge */}
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center",
                        "border-2 border-black bg-black text-[#FFE600]",
                        "text-lg leading-none",
                        "group-hover:bg-[#111] group-data-[active=true]:bg-white group-data-[active=true]:text-[#FF3B3B]",
                      ].join(" ")}
                    >
                      <disaster.icon />
                    </span>
                    {/* Label */}
                    <span
                      className="flex-1 text-[13px]"
                      style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.08em" }}
                    >
                      {disaster.name}
                    </span>
                    {/* Arrow chevron */}
                    <span
                      className="text-black/30 group-hover:text-black group-data-[active=true]:text-white text-xs"
                      aria-hidden
                    >
                      ▶
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>


    </Sidebar>
  )
}