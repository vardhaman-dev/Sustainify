
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Save, Edit, Star, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: "",
    joinedDate: new Date(),
    bio: "",
    preferences: {
      notifications: true,
      newsletter: true,
      locationSharing: true
    }
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        address: parsedData.address || "",
        city: parsedData.city || "",
        state: parsedData.state || "",
        pincode: parsedData.pincode || "",
        profileImage: parsedData.profileImage || "",
        joinedDate: parsedData.joinedDate ? new Date(parsedData.joinedDate) : new Date(),
        bio: parsedData.bio || "Eco-conscious individual passionate about sustainable living.",
        preferences: parsedData.preferences || {
          notifications: true,
          newsletter: true,
          locationSharing: true
        }
      });
    } else {
      // If no user data, redirect to login
      navigate("/auth");
    }
  }, [navigate]);

  const handleSave = () => {
    if (isEditing) {
      // Save to localStorage
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        const updatedUserData = { ...parsedData, ...userData };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        toast.success("Profile updated successfully");
      }
    }
    
    setIsEditing(!isEditing);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!userData.name) return "U";
    return userData.name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          onClick={handleBackClick} 
          variant="ghost" 
          size="sm" 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h2 className="text-2xl font-bold">Your Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="md:col-span-1">
          <Card className="shadow-md border-accent/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-2 border-accent/20">
                  <AvatarImage src={userData.profileImage} />
                  <AvatarFallback className="bg-gradient-to-br from-eco-medium to-eco-dark text-white text-xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-xl font-bold">{userData.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <Star className="h-3 w-3 text-amber-500 mr-1" />
                  Eco Enthusiast
                </p>
                
                <div className="mt-4 w-full text-sm space-y-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{userData.email}</span>
                  </div>
                  {userData.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{userData.phone}</span>
                    </div>
                  )}
                  {userData.city && userData.state && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{userData.city}, {userData.state}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {formatDate(userData.joinedDate)}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-eco-light/10 rounded-lg w-full">
                  <h4 className="font-medium mb-2 text-sm">About</h4>
                  <p className="text-sm text-muted-foreground">
                    {userData.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile content */}
        <div className="md:col-span-2">
          <Card className="shadow-md border-accent/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    {isEditing
                      ? "Edit your personal information below"
                      : "View and manage your personal information"}
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleSave} 
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-1 h-4 w-4" /> Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Personal Details</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      readOnly
                      className="bg-muted"
                    />
                    {!isEditing && <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      readOnly={!isEditing}
                      className={`w-full rounded-md border p-2 ${!isEditing ? "bg-muted" : ""}`}
                      rows={3}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={userData.city}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={userData.state}
                        onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={userData.pincode}
                      onChange={(e) => setUserData({ ...userData, pincode: e.target.value })}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications about your listings</p>
                    </div>
                    <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-muted transition-colors focus:outline-none ${userData.preferences.notifications ? 'bg-eco-medium' : ''}">
                      <span
                        className={`${
                          userData.preferences.notifications ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'
                        } inline-block h-4 w-4 transform rounded-full transition-transform`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border-b">
                    <div>
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-sm text-muted-foreground">Receive our monthly sustainability newsletter</p>
                    </div>
                    <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-muted transition-colors focus:outline-none ${userData.preferences.newsletter ? 'bg-eco-medium' : ''}">
                      <span
                        className={`${
                          userData.preferences.newsletter ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'
                        } inline-block h-4 w-4 transform rounded-full transition-transform`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h4 className="font-medium">Location Sharing</h4>
                      <p className="text-sm text-muted-foreground">Allow approximate location for listings</p>
                    </div>
                    <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-muted transition-colors focus:outline-none ${userData.preferences.locationSharing ? 'bg-eco-medium' : ''}">
                      <span
                        className={`${
                          userData.preferences.locationSharing ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'
                        } inline-block h-4 w-4 transform rounded-full transition-transform`}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
