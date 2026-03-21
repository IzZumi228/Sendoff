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
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup >
          <SidebarMenu>
  {disasters.map((disaster) => (
    <SidebarMenuItem key={disaster.name}>
          <SidebarMenuButton asChild>
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