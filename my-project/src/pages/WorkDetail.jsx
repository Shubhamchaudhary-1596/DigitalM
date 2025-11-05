import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building, TrendingUp, Users, DollarSign, CheckCircle, Target } from 'lucide-react';

const WorkDetail = () => {
  const { slug } = useParams();

  // Case study data (in a real app, this would come from an API)
  const caseStudyData = {
    'fashion-forward-growth': {
      title: 'E-commerce Growth Campaign',
      client: 'Fashion Forward',
      industry: 'E-commerce',
      timeline: '6 months',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      overview: 'Fashion Forward, a mid-sized online fashion retailer, was struggling with low conversion rates and high customer acquisition costs. Despite having quality products, their online presence was not generating the revenue they needed to scale their business.',
      challenge: 'The client faced several critical challenges that were limiting their growth potential and threatening their market position in the competitive e-commerce fashion industry.',
      challenges: [
        'Low online visibility with less than 100 monthly website visitors',
        'Poor conversion rate of only 0.8% on their e-commerce site',
        'High customer acquisition cost of $85 per customer',
        'Limited brand awareness in target demographics',
        'Outdated website design not optimized for mobile users',
        'No cohesive digital marketing strategy across channels'
      ],
      solution: 'We developed a comprehensive digital transformation strategy that addressed each challenge through data-driven solutions and innovative marketing approaches.',
      solutions: [
        {
          title: 'Multi-Platform PPC Strategy',
          description: 'Launched targeted campaigns across Google Ads, Facebook, and Instagram with advanced audience segmentation'
        },
        {
          title: 'Landing Page Optimization',
          description: 'Redesigned and A/B tested landing pages to improve user experience and conversion rates'
        },
        {
          title: 'Advanced Targeting & Retargeting',
          description: 'Implemented sophisticated targeting strategies based on user behavior and demographics'
        },
        {
          title: 'Creative Asset Development',
          description: 'Created high-converting ad creatives and product imagery optimized for each platform'
        }
      ],
      results: [
        { metric: 'Revenue Increase', value: '+285%', description: 'Monthly recurring revenue grew from $45K to $173K', icon: DollarSign },
        { metric: 'Return on Ad Spend', value: '4.2x ROAS', description: 'Average ROAS across all campaigns exceeded industry benchmarks', icon: TrendingUp },
        { metric: 'New Customers', value: '+1,247', description: 'Acquired over 1,200 new customers with 65% retention rate', icon: Users },
        { metric: 'Conversion Rate', value: '+180%', description: 'Website conversion rate improved from 0.8% to 2.24%', icon: TrendingUp }
      ],
      process: [
        {
          phase: 'Discovery & Analysis',
          duration: '2 weeks',
          activities: [
            'Comprehensive business and competitor analysis',
            'Customer persona development',
            'Technical audit of existing infrastructure',
            'Market opportunity assessment'
          ]
        },
        {
          phase: 'Strategy Development',
          duration: '1 week',
          activities: [
            'Multi-channel campaign strategy creation',
            'Budget allocation and timeline planning',
            'Creative concept development',
            'KPI and success metrics definition'
          ]
        },
        {
          phase: 'Implementation',
          duration: '2 weeks',
          activities: [
            'Campaign setup across all platforms',
            'Landing page design and development',
            'Tracking and analytics implementation',
            'Initial campaign launch and monitoring'
          ]
        },
        {
          phase: 'Optimization & Scale',
          duration: 'Ongoing',
          activities: [
            'Daily campaign monitoring and optimization',
            'A/B testing of ad creatives and landing pages',
            'Performance analysis and reporting',
            'Scaling successful campaigns and audiences'
          ]
        }
      ],
      testimonial: {
        quote: "The results exceeded our wildest expectations. Not only did our revenue increase by 285%, but we gained invaluable insights into our customers that will drive our business forward for years to come.",
        author: "Sarah Mitchell",
        position: "CEO, Fashion Forward"
      },
      technologies: ['Google Ads', 'Facebook Ads Manager', 'Google Analytics', 'Hotjar', 'Unbounce', 'Klaviyo'],
      nextSteps: [
        'Expansion to additional advertising platforms',
        'Implementation of advanced automation workflows',
        'Development of customer loyalty programs',
        'International market expansion strategy'
      ]
    }
    // Add other case studies;
  };

  const caseStudy = caseStudyData[slug];

  if (!caseStudy) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">Case Study Not Found</h1>
          <Link to="/work" className="text-[#0ea5a4] hover:text-[#0b9488]">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#0ea5a4]">Home</Link>
            <span className="text-gray-400">→</span>
            <Link to="/work" className="text-gray-600 hover:text-[#0ea5a4]">Work</Link>
            <span className="text-gray-400">→</span>
            <span className="text-[#0ea5a4]">{caseStudy.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/work"
                className="inline-flex items-center text-[#0ea5a4] hover:text-[#0b9488] mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Work
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
                {caseStudy.title}
              </h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-gray-600">
                  <Building className="h-5 w-5 mr-2" />
                  {caseStudy.client}
                </div>
                <div className="flex items-center text-gray-600">
                  <Target className="h-5 w-5 mr-2" />
                  {caseStudy.industry}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  {caseStudy.timeline}
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {caseStudy.overview}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Results Achieved</h2>
          <p className="text-center text-[#ccfbf1] mb-12 max-w-2xl mx-auto">
            Our strategic approach delivered exceptional results that exceeded the client's expectations
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-12 w-12 text-[#99f6e4] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{result.value}</div>
                  <div className="text-lg font-semibold mb-2">{result.metric}</div>
                  <p className="text-[#99f6e4] text-sm">{result.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenge */}
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-6">The Challenge</h2>
              <p className="text-lg text-gray-600 mb-8">{caseStudy.challenge}</p>
              
              <div className="space-y-4">
                {caseStudy.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-6">Our Solution</h2>
              <p className="text-lg text-gray-600 mb-8">{caseStudy.solution}</p>
              
              <div className="space-y-6">
                {caseStudy.solutions.map((solution, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-[#111827] mb-2">{solution.title}</h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">Our Process</h2>
          
          <div className="space-y-8">
            {caseStudy.process.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
              >
                <div className="w-1/12 flex justify-center">
                  <div className="w-12 h-12 bg-[#0ea5a4] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                
                <div className={`w-11/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="bg-white rounded-lg p-8 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#111827]">{phase.phase}</h3>
                      <span className="text-[#0ea5a4] font-semibold">{phase.duration}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {phase.activities.map((activity, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-[#0ea5a4] mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-[#111827] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
            "{caseStudy.testimonial.quote}"
          </blockquote>
          <div>
            <div className="font-semibold text-lg">{caseStudy.testimonial.author}</div>
            <div className="text-[#2dd4bf]">{caseStudy.testimonial.position}</div>
          </div>
        </div>
      </section>

      {/* Technologies & Next Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technologies */}
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Technologies Used</h2>
              <div className="grid grid-cols-2 gap-4">
                {caseStudy.technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <span className="font-medium text-[#111827]">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">What's Next</h2>
              <div className="space-y-3">
                {caseStudy.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#0ea5a4] rounded-full mr-4"></div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Let's discuss how we can help your business achieve exceptional growth with proven strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Success Story
            </Link>
            <Link
              to="/work"
               className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkDetail;
