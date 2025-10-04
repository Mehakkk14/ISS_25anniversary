import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Waves, 
  User, 
  Plus, 
  Minus, 
  Target, 
  Trophy, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Timer
} from 'lucide-react';

interface GameState {
  astronautWeight: number;
  currentBuoyancy: number;
  targetBuoyancy: number;
  weights: number;
  floaties: number;
  isNeutral: boolean;
  gamePhase: 'setup' | 'balancing' | 'mission' | 'complete';
  missionProgress: number;
  score: number;
  timeRemaining: number;
}

interface MissionTask {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  completed: boolean;
  position: { x: number; y: number };
}

const NBLTrainingGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    astronautWeight: 70, // kg
    currentBuoyancy: 0,
    targetBuoyancy: 0,
    weights: 0,
    floaties: 0,
    isNeutral: false,
    gamePhase: 'setup',
    missionProgress: 0,
    score: 0,
    timeRemaining: 300 // 5 minutes
  });

  const [astronautPosition, setAstronautPosition] = useState({ x: 20, y: 50 });
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState(false);

  const missionTasks: MissionTask[] = [
    {
      id: 'panel1',
      name: 'Replace Solar Panel',
      description: 'Move to the broken solar panel and perform maintenance',
      difficulty: 3,
      completed: false,
      position: { x: 70, y: 30 }
    },
    {
      id: 'antenna',
      name: 'Adjust Communication Antenna',
      description: 'Navigate to the antenna and adjust its position',
      difficulty: 2,
      completed: false,
      position: { x: 50, y: 70 }
    },
    {
      id: 'experiment',
      name: 'Install Research Equipment',
      description: 'Carefully move to install delicate scientific equipment',
      difficulty: 4,
      completed: false,
      position: { x: 80, y: 60 }
    }
  ];

  // Calculate buoyancy based on weight and equipment
  useEffect(() => {
    const baseWeight = gameState.astronautWeight + 100; // suit weight
    const totalWeight = baseWeight + (gameState.weights * 2.5); // 2.5kg per weight
    const buoyantForce = 180 + (gameState.floaties * 5); // base buoyancy + floaties
    const netBuoyancy = buoyantForce - totalWeight;
    
    setGameState(prev => ({
      ...prev,
      currentBuoyancy: netBuoyancy,
      isNeutral: Math.abs(netBuoyancy) < 2
    }));
  }, [gameState.astronautWeight, gameState.weights, gameState.floaties]);

  // Game timer
  useEffect(() => {
    if (gameState.gamePhase === 'mission' && gameState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.gamePhase, gameState.timeRemaining]);

  const handleWeightChange = (type: 'add' | 'remove', equipment: 'weights' | 'floaties') => {
    setGameState(prev => ({
      ...prev,
      [equipment]: type === 'add' 
        ? prev[equipment] + 1 
        : Math.max(0, prev[equipment] - 1)
    }));
  };

  const startMission = () => {
    if (gameState.isNeutral) {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'mission',
        timeRemaining: 300
      }));
    }
  };

  const handleAstronautMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragMode && gameState.gamePhase === 'mission') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setAstronautPosition({ 
        x: Math.max(5, Math.min(95, x)), 
        y: Math.max(5, Math.min(95, y)) 
      });
    }
  };

  const checkTaskCompletion = () => {
    missionTasks.forEach(task => {
      const distance = Math.sqrt(
        Math.pow(astronautPosition.x - task.position.x, 2) + 
        Math.pow(astronautPosition.y - task.position.y, 2)
      );
      
      if (distance < 10 && !task.completed) {
        // Task completed!
        setGameState(prev => ({
          ...prev,
          missionProgress: prev.missionProgress + (100 / missionTasks.length),
          score: prev.score + (task.difficulty * 100)
        }));
        task.completed = true;
      }
    });
  };

  useEffect(() => {
    checkTaskCompletion();
  }, [astronautPosition]);

  const resetGame = () => {
    setGameState({
      astronautWeight: 70,
      currentBuoyancy: 0,
      targetBuoyancy: 0,
      weights: 0,
      floaties: 0,
      isNeutral: false,
      gamePhase: 'setup',
      missionProgress: 0,
      score: 0,
      timeRemaining: 300
    });
    setAstronautPosition({ x: 20, y: 50 });
    missionTasks.forEach(task => task.completed = false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBuoyancyStatus = () => {
    if (gameState.currentBuoyancy > 2) return { text: 'Too Floaty', color: 'text-blue-400' };
    if (gameState.currentBuoyancy < -2) return { text: 'Too Heavy', color: 'text-red-400' };
    return { text: 'Neutral Buoyancy', color: 'text-green-400' };
  };

  const buoyancyStatus = getBuoyancyStatus();

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Waves className="w-4 h-4 mr-2" />
            NBL Training Simulation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Neutral Buoyancy Training Game
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience what astronauts go through in NASA's Neutral Buoyancy Laboratory. 
            Balance weights and floaties to achieve neutral buoyancy, then complete underwater missions!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Control Panel */}
            <Card className="bg-slate-800/50 border-blue-500/30 p-6">
              <div className="space-y-6">
                
                {/* Game Status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Astronaut Setup
                  </h3>
                  <Badge variant={gameState.isNeutral ? 'default' : 'destructive'}>
                    {gameState.gamePhase === 'setup' ? 'Calibrating' : 
                     gameState.gamePhase === 'mission' ? 'Mission Active' : 'Complete'}
                  </Badge>
                </div>

                {/* Weight Input */}
                {gameState.gamePhase === 'setup' && (
                  <div>
                    <label className="text-white text-sm font-medium">Your Weight (kg)</label>
                    <Input
                      type="number"
                      value={gameState.astronautWeight}
                      onChange={(e) => setGameState(prev => ({
                        ...prev,
                        astronautWeight: parseInt(e.target.value) || 70
                      }))}
                      className="mt-2 bg-slate-700 border-slate-600 text-white"
                      min="40"
                      max="120"
                    />
                  </div>
                )}

                {/* Equipment Controls */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Lead Weights: {gameState.weights}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWeightChange('remove', 'weights')}
                          disabled={gameState.weights === 0 || gameState.gamePhase === 'mission'}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWeightChange('add', 'weights')}
                          disabled={gameState.gamePhase === 'mission'}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress 
                      value={(gameState.weights / 20) * 100} 
                      className="h-2 bg-slate-700"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Floatation Aids: {gameState.floaties}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWeightChange('remove', 'floaties')}
                          disabled={gameState.floaties === 0 || gameState.gamePhase === 'mission'}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWeightChange('add', 'floaties')}
                          disabled={gameState.gamePhase === 'mission'}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress 
                      value={(gameState.floaties / 20) * 100} 
                      className="h-2 bg-slate-700"
                    />
                  </div>
                </div>

                {/* Buoyancy Status */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Buoyancy Status</span>
                    <span className={`font-bold ${buoyancyStatus.color}`}>
                      {buoyancyStatus.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Heavy</span>
                    <div className="flex-1 bg-slate-600 rounded-full h-3 relative">
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 w-1 bg-white rounded-full h-full"
                        style={{ left: '50%' }}
                      />
                      <div 
                        className={`absolute top-0 h-full rounded-full transition-all duration-300 ${
                          gameState.currentBuoyancy > 0 ? 'bg-blue-400' : 'bg-red-400'
                        }`}
                        style={{ 
                          width: `${Math.min(50, Math.abs(gameState.currentBuoyancy) * 5)}%`,
                          left: gameState.currentBuoyancy > 0 ? '50%' : `${50 - Math.min(50, Math.abs(gameState.currentBuoyancy) * 5)}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">Floaty</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-400">
                      Net Buoyancy: {gameState.currentBuoyancy.toFixed(1)} kg
                    </span>
                  </div>
                </div>

                {/* Mission Controls */}
                <div className="space-y-3">
                  {gameState.gamePhase === 'setup' && (
                    <Button
                      onClick={startMission}
                      disabled={!gameState.isNeutral}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {gameState.isNeutral ? (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Start Mission
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Achieve Neutral Buoyancy First
                        </>
                      )}
                    </Button>
                  )}

                  {gameState.gamePhase === 'mission' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-white">
                        <span className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          Time: {formatTime(gameState.timeRemaining)}
                        </span>
                        <span className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Score: {gameState.score}
                        </span>
                      </div>
                      <Button
                        onClick={() => setDragMode(!dragMode)}
                        variant={dragMode ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {dragMode ? 'Move Mode: ON' : 'Enable Movement'}
                      </Button>
                    </div>
                  )}

                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Training
                  </Button>
                </div>
              </div>
            </Card>

            {/* Training Pool Simulation */}
            <Card className="bg-gradient-to-b from-blue-400/20 to-blue-600/30 border-blue-500/30 p-6 relative overflow-hidden">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Waves className="w-5 h-5" />
                  NBL Training Pool
                </h3>
                <p className="text-gray-300 text-sm">
                  {gameState.gamePhase === 'mission' ? 
                    'Click to move astronaut to complete tasks' : 
                    'Adjust weights and floaties to achieve neutral buoyancy'
                  }
                </p>
              </div>

              {/* Pool Simulation Area */}
              <div 
                className="relative w-full h-96 bg-gradient-to-b from-blue-300/30 to-blue-600/50 rounded-lg border-2 border-blue-400/50 overflow-hidden cursor-pointer"
                onClick={handleAstronautMove}
              >
                {/* Water Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-400/10 animate-pulse" />
                
                {/* Mission Tasks */}
                {gameState.gamePhase === 'mission' && missionTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                      task.completed ? 'opacity-50' : 'opacity-100'
                    }`}
                    style={{
                      left: `${task.position.x}%`,
                      top: `${task.position.y}%`,
                    }}
                  >
                    <div className={`bg-yellow-500 rounded-full p-2 ${!task.completed && 'animate-pulse'}`}>
                      {task.completed ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Target className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                      {task.name}
                    </div>
                  </div>
                ))}

                {/* Astronaut */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${astronautPosition.x}%`,
                    top: `${astronautPosition.y}%`,
                  }}
                >
                  <div className={`relative ${
                    gameState.isNeutral ? 'animate-bounce' : 
                    gameState.currentBuoyancy > 0 ? 'animate-pulse' : 'animate-pulse'
                  }`}>
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    {/* Buoyancy indicator */}
                    <div className="absolute -top-2 -right-2">
                      {gameState.isNeutral ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      ) : (
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          gameState.currentBuoyancy > 0 ? 'bg-blue-400' : 'bg-red-400'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {gameState.gamePhase === 'mission' && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center justify-between text-white text-sm mb-2">
                        <span>Mission Progress</span>
                        <span>{Math.round(gameState.missionProgress)}%</span>
                      </div>
                      <Progress 
                        value={gameState.missionProgress} 
                        className="h-2 bg-slate-700"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Game Info */}
          <Card className="mt-8 bg-slate-800/50 border-blue-500/30 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">🎮 How to Play</h4>
            <div className="grid md:grid-cols-3 gap-4 text-gray-300">
              <div>
                <h5 className="text-blue-400 font-medium mb-2">Step 1: Balance</h5>
                <p className="text-sm">Add weights or floaties to achieve neutral buoyancy. You need to be within ±2kg of neutral.</p>
              </div>
              <div>
                <h5 className="text-blue-400 font-medium mb-2">Step 2: Mission</h5>
                <p className="text-sm">Navigate underwater to complete tasks. Click in the pool to move your astronaut.</p>
              </div>
              <div>
                <h5 className="text-blue-400 font-medium mb-2">Step 3: Complete</h5>
                <p className="text-sm">Reach all mission targets before time runs out. Harder tasks give more points!</p>
              </div>
            </div>
          </Card>
        </div>
      </div>


    </section>
  );
};

export default NBLTrainingGame;