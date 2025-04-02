
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Video, MessageCircle, Clock, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Therapist profiles
const therapists = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    avatar: "",
    specialty: "Anxiety & Depression",
    rating: 4.9,
    reviews: 142,
    bio: "Dr. Johnson specializes in cognitive behavioral therapy for anxiety and depression. With over 15 years of experience, she helps clients develop practical strategies to manage their mental health.",
    nextAvailable: "Tomorrow",
    price: "$120",
    badges: ["CBT Certified", "Anxiety Specialist"],
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    avatar: "",
    specialty: "Stress Management",
    rating: 4.8,
    reviews: 113,
    bio: "Dr. Chen combines traditional therapy with mindfulness techniques to help clients manage stress and achieve better work-life balance. He specializes in helping professionals in high-stress industries.",
    nextAvailable: "Today",
    price: "$140",
    badges: ["Mindfulness Expert", "Work-Life Balance"],
  },
  {
    id: "dr-james-rodriguez",
    name: "Dr. James Rodriguez",
    avatar: "",
    specialty: "Sleep Disorders",
    rating: 4.7,
    reviews: 98,
    bio: "Dr. Rodriguez is an expert in treating sleep disorders and insomnia without reliance on medication. He helps clients develop healthy sleep routines and manage sleep-related anxiety.",
    nextAvailable: "In 2 days",
    price: "$110",
    badges: ["Sleep Specialist", "Insomnia Treatment"],
  },
  {
    id: "dr-emily-patel",
    name: "Dr. Emily Patel",
    avatar: "",
    specialty: "Relationship Counseling",
    rating: 4.9,
    reviews: 167,
    bio: "Dr. Patel specializes in helping individuals navigate relationship challenges, whether romantic, familial, or professional. She provides practical tools to improve communication and set healthy boundaries.",
    nextAvailable: "In 3 days",
    price: "$130",
    badges: ["Relationship Expert", "Communication Skills"],
  },
];

type AppointmentType = {
  id: string;
  therapistId: string;
  date: Date;
  time: string;
  type: "video" | "chat";
  status: "upcoming" | "completed" | "cancelled";
};

// Sample upcoming appointments
const sampleAppointments: AppointmentType[] = [
  {
    id: "apt-1",
    therapistId: "dr-sarah-johnson",
    date: addDays(new Date(), 2),
    time: "10:00 AM",
    type: "video",
    status: "upcoming",
  },
];

export const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<"video" | "chat">("video");
  const [appointments, setAppointments] = useState<AppointmentType[]>(sampleAppointments);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Available time slots - in a real app, these would be fetched based on therapist availability
  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBookAppointment = () => {
    if (!date || !selectedTherapist || !selectedTime) {
      toast.error("Please select all required fields");
      return;
    }

    // Create new appointment
    const newAppointment: AppointmentType = {
      id: `apt-${Date.now()}`,
      therapistId: selectedTherapist,
      date: date,
      time: selectedTime,
      type: appointmentType,
      status: "upcoming",
    };

    // Add to appointments list
    setAppointments([...appointments, newAppointment]);

    // Reset form
    setStep(1);
    setSelectedTherapist(null);
    setSelectedTime(null);

    // Show success message
    toast.success("Appointment booked successfully!");
  };

  const handleCancelAppointment = (id: string) => {
    // Update appointment status to cancelled
    const updatedAppointments = appointments.map(apt =>
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    );
    
    setAppointments(updatedAppointments);
    toast.success("Appointment cancelled successfully");
  };

  // Get therapist details by ID
  const getTherapist = (id: string) => therapists.find(t => t.id === id);

  // Filter for upcoming appointments
  const upcomingAppointments = appointments.filter(apt => apt.status === "upcoming");

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Appointments</h2>
        <p className="text-mindmend-text-muted">Schedule consultations with mental health professionals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Book a New Appointment</CardTitle>
              <CardDescription>Choose a therapist and schedule a time that works for you</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {therapists.map((therapist) => (
                      <div
                        key={therapist.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-mindmend-blue",
                          selectedTherapist === therapist.id
                            ? "border-mindmend-blue bg-mindmend-blue/5"
                            : "border-gray-200"
                        )}
                        onClick={() => setSelectedTherapist(therapist.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={therapist.avatar} />
                            <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                              {therapist.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{therapist.name}</h3>
                              <div className="flex items-center text-sm">
                                <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" filled />
                                <span>{therapist.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-mindmend-text-muted">{therapist.specialty}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {therapist.badges.map((badge, idx) => (
                                <Badge variant="outline" key={idx} className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-3 text-sm">
                              <span>
                                Next available: <span className="font-medium">{therapist.nextAvailable}</span>
                              </span>
                              <span className="font-medium">{therapist.price}/session</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button 
                      className="button-gradient"
                      onClick={() => setStep(2)}
                      disabled={!selectedTherapist}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <Button variant="outline" className="mb-4" onClick={() => setStep(1)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Therapists
                  </Button>

                  {selectedTherapist && (
                    <div className="border rounded-lg p-4 bg-mindmend-blue/5 border-mindmend-blue/30 mb-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={getTherapist(selectedTherapist)?.avatar} />
                          <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                            {getTherapist(selectedTherapist)?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{getTherapist(selectedTherapist)?.name}</h3>
                          <p className="text-sm text-mindmend-text-muted">{getTherapist(selectedTherapist)?.specialty}</p>
                          <p className="text-sm mt-2">{getTherapist(selectedTherapist)?.bio}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Select Date</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={{ before: new Date() }}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Select Time</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimes.map((time) => (
                            <div
                              key={time}
                              className={cn(
                                "border rounded-lg p-2 text-center cursor-pointer transition-all duration-200 text-sm",
                                selectedTime === time
                                  ? "border-mindmend-blue bg-mindmend-blue/5 text-mindmend-blue"
                                  : "border-gray-200 hover:border-mindmend-blue"
                              )}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Appointment Type</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className={cn(
                              "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                              appointmentType === "video"
                                ? "border-mindmend-blue bg-mindmend-blue/5"
                                : "border-gray-200 hover:border-mindmend-blue"
                            )}
                            onClick={() => setAppointmentType("video")}
                          >
                            <div className="flex items-center">
                              <Video className="h-5 w-5 mr-2 text-mindmend-blue" />
                              <span>Video Call</span>
                            </div>
                            <p className="text-xs text-mindmend-text-muted mt-1">
                              Face to face consultation via video
                            </p>
                          </div>
                          
                          <div
                            className={cn(
                              "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                              appointmentType === "chat"
                                ? "border-mindmend-lavender bg-mindmend-lavender/5"
                                : "border-gray-200 hover:border-mindmend-lavender"
                            )}
                            onClick={() => setAppointmentType("chat")}
                          >
                            <div className="flex items-center">
                              <MessageCircle className="h-5 w-5 mr-2 text-mindmend-lavender" />
                              <span>Chat</span>
                            </div>
                            <p className="text-xs text-mindmend-text-muted mt-1">
                              Text-based consultation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      className="button-gradient"
                      onClick={() => setStep(3)}
                      disabled={!date || !selectedTime}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <Button variant="outline" className="mb-4" onClick={() => setStep(2)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Scheduling
                  </Button>

                  <div className="bg-mindmend-blue/5 rounded-lg p-6 border border-mindmend-blue/30">
                    <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={getTherapist(selectedTherapist || "")?.avatar} />
                          <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                            {getTherapist(selectedTherapist || "")?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{getTherapist(selectedTherapist || "")?.name}</h4>
                          <p className="text-sm text-mindmend-text-muted">{getTherapist(selectedTherapist || "")?.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="flex items-start">
                          <CalendarIcon className="h-5 w-5 mr-3 text-mindmend-text-muted" />
                          <div>
                            <p className="text-sm font-medium">Date</p>
                            <p className="text-mindmend-text-muted">{date ? format(date, "EEEE, MMMM d, yyyy") : ""}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 mr-3 text-mindmend-text-muted" />
                          <div>
                            <p className="text-sm font-medium">Time</p>
                            <p className="text-mindmend-text-muted">{selectedTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          {appointmentType === "video" ? (
                            <Video className="h-5 w-5 mr-3 text-mindmend-text-muted" />
                          ) : (
                            <MessageCircle className="h-5 w-5 mr-3 text-mindmend-text-muted" />
                          )}
                          <div>
                            <p className="text-sm font-medium">Appointment Type</p>
                            <p className="text-mindmend-text-muted">
                              {appointmentType === "video" ? "Video Call" : "Chat"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-3 text-mindmend-text-muted" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-mindmend-text-muted">
                              {appointmentType === "video" ? "Virtual (link will be sent)" : "In-app chat"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button 
                      className="button-gradient"
                      onClick={handleBookAppointment}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="glass-card sticky top-24">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => {
                    const therapist = getTherapist(appointment.therapistId);
                    return (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={therapist?.avatar} />
                            <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                              {therapist?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{therapist?.name}</p>
                            <p className="text-xs text-mindmend-text-muted">{therapist?.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-mindmend-text-muted" />
                            <span>{format(appointment.date, "EEEE, MMMM d")}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-mindmend-text-muted" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            {appointment.type === "video" ? (
                              <Video className="h-4 w-4 mr-2 text-mindmend-text-muted" />
                            ) : (
                              <MessageCircle className="h-4 w-4 mr-2 text-mindmend-text-muted" />
                            )}
                            <span>{appointment.type === "video" ? "Video Call" : "Chat"}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-4 pt-3 border-t">
                          <Button variant="outline" size="sm" className="text-xs"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                          <Button asChild size="sm" className="text-xs bg-mindmend-blue text-white">
                            <Link to="/messaging">
                              {appointment.type === "video" ? (
                                <>
                                  <Video className="h-3 w-3 mr-1" /> Join Call
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="h-3 w-3 mr-1" /> Open Chat
                                </>
                              )}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-10 w-10 mx-auto text-mindmend-text-muted mb-2" />
                    <p className="text-mindmend-text-muted">No upcoming appointments</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Link = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => {
  return <a href={to} {...props}>{children}</a>;
};
