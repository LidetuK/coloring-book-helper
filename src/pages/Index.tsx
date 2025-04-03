
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits";
import CTASection from "@/components/CTASection";
import ConsultationOffer from "@/components/ConsultationOffer";
import Elevate from "@/components/Elevate";
import Countdown from '@/components/Countdown';
import RushMe from '@/components/RushMe';
import Benefit from '@/components/Benefit';
import AuthorBio from '@/components/AuthorBio';
import CallToAction from '@/components/CallToAction';
import AnimatedTestimonials from '@/components/AnimatedTestimonials';
import BookShow from '@/components/BookShow';
import Review from '@/components/Review';
import Testimonial from '@/components/Testimonial';
import BookOne from '@/components/BookOne';
import BonusSection from '@/components/BonusSection';
import LimitedOffer from '@/components/LimitedOffer';
import FinalCTA from '@/components/FinalCTA';
import BookPopup from '@/components/BookPopup';
import NewsletterPopup from '@/components/NewsletterPopup';
import Animated from '@/components/Animated';
import DualBookOffer from '@/components/DualBookOffer';
import Limit from '@/components/Limit';

const Index = () => {
  useEffect(() => {
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <BookPopup />
      <NewsletterPopup />
      <Hero />
      <Elevate/>
      <Countdown/>
      <Benefit/>
      <AuthorBio/>
      <RushMe/>
      <Limit />
      <CTASection />
      <CallToAction/>
      <Animated/>
      <AnimatedTestimonials/>
      <DualBookOffer />
      <BookShow/>
      <Review/>
      <Testimonial/>
      <BookOne/>
      <BonusSection/>
      <LimitedOffer/>
      <FinalCTA/>
      <FAQ />
      <ConsultationOffer/>
    </div>
  );
};

export default Index;
