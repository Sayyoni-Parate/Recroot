import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle2, Star, Briefcase, Code2, GraduationCap } from 'lucide-react';

export default function HeroSection() {
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Cursor Gradient Follow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 50 + window.innerWidth / 2}px ${mousePosition.y * 50 + window.innerHeight / 2}px, rgba(96, 165, 250, 0.1), transparent 40%)`
        }}
      />

      {/* Animation Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] bg-blue-500/20 rounded-full mix-blend-multiply animate-pulse-glow"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px] bg-purple-500/20 rounded-full mix-blend-multiply animate-pulse-glow animation-delay-2000"
            style={{
              transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`
            }}
          />
        </div>

        {/* Floating CV Cards */}
        <div className="absolute inset-0 flex items-center justify-center perspective-1000">
          {/* Card Stack 1 */}
          <div 
            className="absolute animate-float cursor-pointer"
            style={{
              transform: `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 0) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
          >
            <ProfileCard
              name="Sarah Chen"
              role="Full Stack Developer"
              skills={['React', 'Node.js', 'Python']}
              match={98}
              delay="animation-delay-2000"
            />
          </div>

          {/* Card Stack 2 */}
          <div 
            className="absolute -translate-x-64 animate-float cursor-pointer animation-delay-2000"
            style={{
              transform: `translate3d(${-64 * 4 + mousePosition.x * 3}px, ${mousePosition.y * 3}px, 0) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
          >
            <ProfileCard
              name="James Wilson"
              role="DevOps Engineer"
              skills={['AWS', 'Docker', 'Kubernetes']}
              match={95}
              delay="animation-delay-4000"
            />
          </div>

          {/* Card Stack 3 */}
          <div 
            className="absolute translate-x-64 animate-float cursor-pointer animation-delay-4000"
            style={{
              transform: `translate3d(${64 * 4 + mousePosition.x * 4}px, ${mousePosition.y * 4}px, 0) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
          >
            <ProfileCard
              name="Maria Garcia"
              role="UI/UX Designer"
              skills={['Figma', 'React', 'TypeScript']}
              match={92}
              delay="animation-delay-6000"
            />
          </div>
        </div>

        {/* Interactive Connecting Lines */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${mousePosition.x}deg)`
            }}
          >
            <div className="absolute w-full h-full border-2 border-blue-400/20 rounded-full animate-pulse"></div>
            <div className="absolute w-full h-full border-2 border-purple-400/20 rounded-full animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div 
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl transform transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <h1 className="text-5xl font-bold sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Find Talent That Truly Fits
          </h1>
          <p className="mt-6 text-xl text-gray-800">
            AI-powered matching to connect exceptional engineers with their perfect opportunities
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatsCard 
            title="Active Jobs" 
            value="150+" 
            color="from-blue-500 to-blue-600"
            icon={<Briefcase className="w-8 h-8" />}
          />
          <StatsCard 
            title="Candidates" 
            value="1,000+" 
            color="from-purple-500 to-purple-600"
            icon={<UserCircle2 className="w-8 h-8" />}
          />
          <StatsCard 
            title="Successful Placements" 
            value="500+" 
            color="from-pink-500 to-pink-600"
            icon={<GraduationCap className="w-8 h-8" />}
          />
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ name, role, skills, match, delay }: { 
  name: string; 
  role: string; 
  skills: string[];
  match: number;
  delay: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`transform transition-all duration-500 ${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-72 bg-white rounded-xl shadow-2xl p-6 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'scale-105 shadow-3xl' : ''}`}>
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" /> {match}% Match
        </div>
        
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <UserCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium">{role}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className={`px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Code2 className="w-4 h-4" />
            <span className="text-sm">5+ years experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, color, icon }: { 
  title: string; 
  value: string; 
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="transform hover:scale-105 transition-all duration-300">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white px-7 py-6 rounded-lg leading-none flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {value}
            </p>
          </div>
          <div className={`text-gradient-r ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}