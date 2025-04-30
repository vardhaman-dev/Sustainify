
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarbonImpactCard from "@/components/dashboard/CarbonImpactCard";
import DashboardListings from "@/components/dashboard/DashboardListings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ListChecks, UserCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("listings");
  
  // Get user data from localStorage
  const userData = localStorage.getItem('userData') ? 
    JSON.parse(localStorage.getItem('userData')!) : { name: "User", walletBalance: 25000 };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name || "there"}!</h1>
          <p className="text-muted-foreground">Manage your listings, track your impact, and explore your dashboard</p>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">₹{userData.walletBalance?.toLocaleString('en-IN') || "0"}</div>
                <Link to="/wallet" className="ml-auto text-xs text-eco-medium hover:underline">
                  Add funds
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">42</div>
                <p className="ml-2 text-xs text-green-500">+12% this week</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                
                {activeTab === "listings" && (
                  <div className="flex gap-2">
                    <Link to="/sell">
                      <Button size="sm">Sell Item</Button>
                    </Link>
                    <Link to="/rent">
                      <Button size="sm" variant="outline">Rent Item</Button>
                    </Link>
                  </div>
                )}
              </div>
              
              <TabsContent value="listings">
                <DashboardListings />
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium mb-2">No Messages Yet</h3>
                    <p className="text-muted-foreground">
                      When someone contacts you about your listings, messages will appear here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transactions">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium mb-2">No Transactions Yet</h3>
                    <p className="text-muted-foreground">
                      Your purchase and sales history will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="space-y-8">
              <CarbonImpactCard />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/profile">
                      <Button variant="outline" className="w-full justify-start">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link to="/wallet">
                      <Button variant="outline" className="w-full justify-start">
                        <Wallet className="mr-2 h-4 w-4" />
                        Manage Wallet
                      </Button>
                    </Link>
                    <Link to="/recycle">
                      <Button variant="outline" className="w-full justify-start eco-gradient text-white">
                        <Activity className="mr-2 h-4 w-4" />
                        Increase Impact
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
