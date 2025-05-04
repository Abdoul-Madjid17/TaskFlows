import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, ArrowRight, CheckCircle, Clock, Users, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manage Your Tasks with <span className="text-primary-600">WorkSync</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern task management application designed for teams and individuals.
            Stay organized, meet deadlines, and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your tasks efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, organize, and track tasks with ease. Set priorities, deadlines, and categories.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Due Dates & Reminders</h3>
              <p className="text-gray-600">
                Never miss a deadline with due dates and status tracking for all your tasks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with team members, assign tasks, and track progress together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who manage their tasks efficiently with TaskFlow.
          </p>
          <Link to="/register">
            <Button 
              variant="secondary" 
              size="lg"
              rightIcon={<ArrowRight size={20} />}
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Secure & Reliable
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                TaskFlow is built with security in mind, using Azure's robust infrastructure.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckSquare className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure authentication with Azure Static Web Apps</span>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Data encrypted at rest and in transit</span>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Regular backups and high availability</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Enterprise-Grade Security</h3>
                  <p className="text-gray-600 text-center">
                    TaskFlow leverages Azure's security features to ensure your data is always protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
