import AuthContext from "context/AuthContext";
import { useContext, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "lib/utils";
import "./Navbar.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Switch } from "components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);
  const navbar = useRef<HTMLDivElement>(null);

  return (
    <NavigationMenu className="NavigationMenuRoot">
      <NavigationMenuList className="NavigationMenuList flex justify-between px-12 py-2 w-screen shadow-sm">
        <div id="nav-left" className="flex">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="NavigationMenuLink">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/add-property"
              className="NavigationMenuLink"
            >
              List property
            </NavigationMenuLink>
          </NavigationMenuItem>
          {user && user.is_staff ? (
            <NavigationMenuItem>
              <NavigationMenuLink href="/review" className="NavigationMenuLink">
                Review
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <></>
          )}
        </div>

        <div id="nav-right" className="flex">
          <NavigationMenuItem className="justify-center">
            <Switch className="leading-none" />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Popover>
              <PopoverTrigger>
                
                  <Avatar className="AvatarRoot">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="AvatarImage"
                    />
                    
                    <AvatarFallback className="AvatarFallback">
                      CN
                    </AvatarFallback>
                    
                  </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-3 py-2">
                  <ul className="space-y-2">
                    <ListItem href="/profile/assets" title="Profile">
                      View and manage your assets
                    </ListItem>
                    <li>
                      <Link
                        to={"/login"}
                        onClick={logoutUser}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Logout
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>

    // <nav id="navbar" ref={navbar}>
    //   <div id="nav-left">
    //     <Link to="/" className="nav-btn">
    //       <h3 id="nav-logo">Essentials Estate</h3>
    //     </Link>
    //     <Link to="/add-property" className="nav-btn">
    //       List your property!
    //     </Link>
    //     {(user && user.is_staff) ? (
    //       <Link to="/review" className="nav-btn">
    //         Review
    //       </Link>
    //     ) : (
    //       <></>
    //     )}
    //   </div>

    //   <div id="nav-right">
    //     <Link to="/profile/assets" className="nav-btn">
    //       Profile
    //     </Link>
    //     {user ? (
    //       <Link to={"/login"} onClick={logoutUser} className="nav-btn">
    //         Logout
    //       </Link>
    //     ) : (
    //       <Link to={"/login"} className="nav-btn">
    //         Login
    //       </Link>
    //     )}
    //   </div>
    // </nav>
  );
}

export default Navbar;
