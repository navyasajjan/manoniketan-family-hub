import { useState } from "react";
import { MessageSquare, Heart, Reply, BadgeCheck, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  isModerator?: boolean;
  group: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

const CommunityForum = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const groups = [
    { name: "Speech Delay Support", members: 342, color: "bg-primary-light" },
    { name: "Autism Care", members: 589, color: "bg-accent-light" },
    { name: "Feeding Challenges", members: 234, color: "bg-secondary-light" },
    { name: "Behavioral Support", members: 421, color: "bg-muted" },
    { name: "Parent Victories", members: 678, color: "bg-primary-light" },
  ];

  const handleCreatePost = () => {
    // Handle post creation logic here
    console.log({ title: newPostTitle, content: newPostContent, group: selectedGroup });
    setIsNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
    setSelectedGroup("");
  };

  const [posts] = useState<Post[]>([
    {
      id: "1",
      author: "Priya M.",
      authorAvatar: "/placeholder.svg",
      group: "Speech Delay Support",
      title: "My son said his first word today! 🎉",
      content:
        "After months of therapy and practice, Aarav finally said 'mama' clearly! I'm so emotional. Thank you all for your support and encouragement.",
      timestamp: "2 hours ago",
      likes: 45,
      replies: 12,
    },
    {
      id: "2",
      author: "Dr. Sharma",
      authorAvatar: "/placeholder.svg",
      isModerator: true,
      group: "Autism Care",
      title: "Tips for managing sensory overload",
      content:
        "Here are some practical strategies to help your child during sensory overload situations. Remember, every child is different, so adapt these to your child's needs.",
      timestamp: "5 hours ago",
      likes: 89,
      replies: 23,
    },
    {
      id: "3",
      author: "Rajesh K.",
      authorAvatar: "/placeholder.svg",
      group: "Feeding Challenges",
      title: "Success with picky eating!",
      content:
        "We've been following the techniques from the training library, and my daughter is now trying new foods! It took patience but it's working.",
      timestamp: "1 day ago",
      likes: 34,
      replies: 8,
    },
    {
      id: "4",
      author: "Anita D.",
      authorAvatar: "/placeholder.svg",
      group: "Parent Victories",
      title: "Celebrating small wins",
      content:
        "Today my child made eye contact during our play session. These moments make all the hard work worth it! 💙",
      timestamp: "1 day ago",
      likes: 67,
      replies: 15,
    },
  ]);

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Community Forum 💬
            </h1>
            <p className="text-muted-foreground">Connect with other parents and share experiences</p>
          </div>
          <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-display">Create New Post</DialogTitle>
                <DialogDescription>
                  Share your experiences, questions, or victories with the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label htmlFor="group">Discussion Group</Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger id="group">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.name} value={group.name}>
                          {group.name} ({group.members} members)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="What's on your mind?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, experiences, or questions..."
                    className="min-h-[150px]"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4 mt-4 bg-background">
                <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={!newPostTitle || !newPostContent || !selectedGroup}>
                  Post to Community
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-soft hover-lift">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback className="bg-primary-light text-primary">
                        {post.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{post.author}</span>
                        {post.isModerator && (
                          <Badge className="bg-accent text-accent-foreground gap-1">
                            <BadgeCheck className="h-3 w-3" />
                            Moderator
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{post.group}</Badge>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Reply className="h-4 w-4" />
                      {post.replies}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display">Discussion Groups</CardTitle>
                <CardDescription>Join groups that match your interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.name}
                    className={`p-4 rounded-lg ${group.color} cursor-pointer hover-lift`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{group.name}</span>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-accent-light border-accent">
              <CardHeader>
                <CardTitle className="text-accent font-display">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-card-foreground">
                  <li>• Be respectful and supportive</li>
                  <li>• Share experiences, not medical advice</li>
                  <li>• Protect privacy - no personal information</li>
                  <li>• Report inappropriate content</li>
                  <li>• Celebrate everyone's journey</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
