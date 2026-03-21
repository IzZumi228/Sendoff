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
    <Sidebar variant="sidebar" collapsible="none">
      <SidebarHeader className="border-b-4 border-border bg-primary text-primary-foreground shadow-[4px_4px_0_#111]">
        <span className="text-2xl tracking-widest">Sendoff</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-2">
          <SidebarMenu>
  {disasters.map((disaster) => (
    <SidebarMenuItem key={disaster.name}>
          <SidebarMenuButton asChild className="rounded-md border-2 border-border bg-background">
            <a href={disaster.url}>
              <disaster.icon />
              <span>{disaster.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
        </SidebarGroup >
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}