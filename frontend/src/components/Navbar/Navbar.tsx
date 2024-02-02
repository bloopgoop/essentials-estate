import Logo from "components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import AuthContext from "context/AuthContext";
import { cn } from "lib/utils";
import { forwardRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ThemeToggle from "components/ThemeToggle";

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

  return (
    <NavigationMenu className="NavigationMenuRoot">
      <NavigationMenuList className="flex justify-between px-12 py-2 w-screen bg-background shadow-sm shadow-border">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="NavigationMenuLink hover:bg-accent">
            <Logo />
          </NavigationMenuLink>
        </NavigationMenuItem>

        <div className="flex">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/add-property"
              className="NavigationMenuLink hover:bg-accent"
            >
              List property
            </NavigationMenuLink>
          </NavigationMenuItem>
          {user && user.is_staff ? (
            <NavigationMenuItem>
              <NavigationMenuLink href="/review" className="NavigationMenuLink hover:bg-accent">
                Review
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <></>
          )}
        </div>

        <div className="flex">
          <NavigationMenuItem className="justify-center">
            <div className="px-3 h-10 flex items-center">
              <ThemeToggle />
            </div>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <div className="px-3 h-10 ">
              <Popover>
                <PopoverTrigger className="AvatarBox rounded-full">
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
                <PopoverContent className="my-3">
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
                            {user ? "Logout" : "Login"}
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
