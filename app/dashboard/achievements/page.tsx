"use client";

import { Trophy, Star, Medal, Target, Zap, BookOpen, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: BookOpen,
      earned: true,
      earnedDate: "2024-01-15",
      points: 100,
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 3 lessons in one day",
      icon: Zap,
      earned: true,
      earnedDate: "2024-01-20",
      points: 150,
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "Study for 7 consecutive days",
      icon: Target,
      earned: true,
      earnedDate: "2024-01-25",
      points: 200,
    },
    {
      id: 4,
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      icon: Medal,
      earned: false,
      progress: 60,
      points: 250,
    },
    {
      id: 5,
      title: "Course Completionist",
      description: "Complete 5 courses",
      icon: Trophy,
      earned: false,
      progress: 40,
      points: 500,
    },
    {
      id: 6,
      title: "Top Performer",
      description: "Rank in top 10% of learners",
      icon: Star,
      earned: false,
      progress: 75,
      points: 300,
    },
  ];

  const stats = {
    totalPoints: 450,
    coursesCompleted: 2,
    averageScore: 87,
    studyStreak: 12,
  };

  const earnedAchievements = achievements.filter((a) => a.earned);
  const inProgressAchievements = achievements.filter((a) => !a.earned);

  return (
    <DashboardLayout type="student">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
            <p className="text-gray-600">Track your learning milestones and progress</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
                    <p className="text-sm text-gray-600">Total Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.coursesCompleted}</p>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.studyStreak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earned Achievements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Earned Achievements ({earnedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedAchievements.map((achievement) => (
                <Card key={achievement.id} className="border-2 border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <achievement.icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {achievement.title}
                        </CardTitle>
                        <Badge className="bg-yellow-100 text-yellow-800 mt-1">
                          +{achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{achievement.description}</p>
                    {achievement.earnedDate && (
                      <p className="text-sm text-gray-500">
                        Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* In Progress Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              In Progress ({inProgressAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressAchievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <achievement.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {achievement.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">
                          +{achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{achievement.description}</p>
                    {achievement.progress && (
                      <div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
