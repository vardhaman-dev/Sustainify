import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, IndianRupee } from "lucide-react";

const WalletPage = () => {
  const [balance, setBalance] = useState(1000); // Updated starting balance to 1000
  const [amountToAdd, setAmountToAdd] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleAddFunds = (paymentMethod: string) => {
    const amount = parseFloat(amountToAdd);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv || !cardName)) {
      toast.error("Please fill all card details");
      return;
    }
    
    if (paymentMethod === 'upi' && !upiId) {
      toast.error("Please enter a valid UPI ID");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setBalance(prev => prev + amount);
      setAmountToAdd("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setCardName("");
      setUpiId("");
      setIsProcessing(false);
      toast.success(`₹${amount} added to your wallet`);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden border border-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-eco-medium/90 to-eco-dark/90 text-white">
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription className="text-white/80">Your current available balance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-muted/30 p-6 rounded-md text-center">
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p className="text-4xl font-bold">₹{balance.toLocaleString('en-IN')}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-accent/20 shadow-lg">
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
              <CardDescription>Add money to your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                    className="border-eco-medium/30"
                  />
                </div>
                
                <Tabs defaultValue="card">
                  <TabsList className="w-full">
                    <TabsTrigger value="card" className="flex-1">
                      <CreditCard className="h-4 w-4 mr-2" /> Credit/Debit Card
                    </TabsTrigger>
                    <TabsTrigger value="upi" className="flex-1">
                      <IndianRupee className="h-4 w-4 mr-2" /> UPI
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry" 
                          placeholder="MM/YY" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input 
                          id="cardCvv" 
                          type="password" 
                          placeholder="***" 
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleAddFunds('card')}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Add Funds"}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="upi" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId" 
                        placeholder="name@ybl" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleAddFunds('upi')}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? "Processing..." : "Pay with UPI"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8 border border-accent/20 shadow-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <p>No transactions yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WalletPage;
