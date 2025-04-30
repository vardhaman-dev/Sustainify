
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type UserType = "user" | "recycler" | "ngo";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("user");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! Please check your email to verify your account.");
      // In a real app, would redirect to login or dashboard
    }, 1500);

    // API call would be like this:
    // POST /api/auth/register
    // body: { email, password, userType, address (if recycler or ngo) }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Join our eco-friendly marketplace today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as UserType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="recycler">Recycler</TabsTrigger>
            <TabsTrigger value="ngo">NGO</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <p className="text-sm text-muted-foreground mb-4">
              Register as a user to buy, sell, or rent items.
            </p>
          </TabsContent>
          <TabsContent value="recycler">
            <p className="text-sm text-muted-foreground mb-4">
              Register as a recycler to list your recycling facility on our platform.
            </p>
          </TabsContent>
          <TabsContent value="ngo">
            <p className="text-sm text-muted-foreground mb-4">
              Register as an NGO to receive donations through our platform.
            </p>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" required />
          </div>

          {(userType === "recycler" || userType === "ngo") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input id="organization" placeholder="Your Organization" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Eco Street" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Greenville" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" required />
                </div>
              </div>
            </>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isLoading} onClick={handleRegister}>
          {isLoading ? "Creating Account..." : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
