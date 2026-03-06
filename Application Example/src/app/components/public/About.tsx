import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Shield, Target, Eye, Heart, Users, Award } from 'lucide-react';

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About DisasterAid</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A non-profit organization dedicated to providing rapid, effective disaster response 
              and relief to communities in need around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010, DisasterAid emerged from a critical need to improve disaster response 
                  coordination and efficiency. After witnessing the challenges faced by communities during 
                  major natural disasters, our founders set out to create a system that could save lives 
                  through better organization and rapid deployment.
                </p>
                <p>
                  What started as a small team of dedicated volunteers has grown into a comprehensive 
                  disaster response network with partnerships across multiple countries. We've responded 
                  to over 500 major disasters, helping tens of thousands of families recover and rebuild.
                </p>
                <p>
                  Today, we leverage modern technology including our advanced emergency management system 
                  to coordinate relief efforts more effectively than ever before. Our commitment remains 
                  the same: to be there when communities need us most.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1584690237767-9b063e0c6392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjByZXNwb25zZSUyMHRlYW0lMjBhY3Rpb258ZW58MXx8fHwxNzcyMDExNjE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Emergency response team in action"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-600">
              <CardContent className="pt-6">
                <div className="size-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To provide rapid, coordinated disaster response that saves lives, reduces suffering, 
                  and helps communities recover and rebuild stronger than before.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="size-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where every community has access to timely, effective disaster relief, 
                  and where no one faces the aftermath of disaster alone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-orange-600">
              <CardContent className="pt-6">
                <div className="size-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Compassion, excellence, transparency, and rapid response guide everything we do. 
                  We treat every person with dignity and respect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide our work and ensure we deliver the highest quality disaster response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="size-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Rapid Response</h4>
                <p className="text-gray-600">
                  Every second counts in disaster situations. We maintain 24/7 readiness to deploy 
                  resources within hours of an emergency request.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="size-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Community-Centered</h4>
                <p className="text-gray-600">
                  We work alongside affected communities, respecting local knowledge and empowering 
                  people to participate in their own recovery.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="size-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence & Innovation</h4>
                <p className="text-gray-600">
                  We continuously improve our methods, leveraging technology and best practices to 
                  deliver more effective relief operations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="size-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Transparency & Accountability</h4>
                <p className="text-gray-600">
                  We maintain complete transparency in our operations and are accountable to the 
                  communities we serve and our supporters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Since our founding, we've made a meaningful difference in disaster-affected communities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">People Assisted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Relief Operations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              DisasterAid is powered by dedicated professionals, volunteers, and partners committed to 
              making a difference when it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="size-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  200+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Responders</h4>
                <p className="text-gray-600">
                  Trained professionals ready to deploy at a moment's notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1,000+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Volunteers</h4>
                <p className="text-gray-600">
                  Dedicated individuals supporting relief operations worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="size-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  100+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Partner Organizations</h4>
                <p className="text-gray-600">
                  Collaborating with local and international relief agencies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
