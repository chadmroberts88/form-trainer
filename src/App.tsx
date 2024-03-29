import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { grey } from './colors';
import { Provider } from 'react-redux';
import store from './state/store';
import './App.css';

import Canvas from './components/Canvas';
import ControlPanel from './components/ControlPanel';
import ExerciseList from './components/ExerciseList';
import SettingsPanel from './components/SettingsPanel';
import ProgressIndicator from './components/ProgressIndicator';

const { Sider, Content } = Layout;
const { Title } = Typography;

const titleStyle: React.CSSProperties = {
  color: 'black',
  textAlign: 'left',
  marginTop: '0px',
};

const siderStyle: React.CSSProperties = {
  backgroundColor: `${grey[2]}`,
};

const siderContainerStyle: React.CSSProperties = {
  height: '100%',
  padding: '20px',
};

const siderContentStyle: React.CSSProperties = {
  height: 'calc(100% - 40px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const contentStyle: React.CSSProperties = {
  height: '100%',
  minHeight: '580px',
  backgroundColor: `${grey[5]}`,
};

const canvasContainerStyle: React.CSSProperties = {
  minHeight: '480px',
  height: 'calc(100% - 200px)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const timerContainerStyle: React.CSSProperties = {
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function App() {
  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [selectedExercise, setSelectedExercise] = useState<string>('Seated Shoulder Press');
  const [exerciseState, setExerciseState] = useState<string>('STOP');
  const [reps, setReps] = useState<number>(12);
  const [pace, setPace] = useState<number>(4);

  console.log(store.getState());

  const handleSetExercise = (exercise: string): void => {
    setSelectedExercise(exercise);
  };

  const handleSetExerciseState = (exerciseState: string): void => {
    setExerciseState(exerciseState);
  };

  const handleSetPace = (pace: number): void => {
    setPace(pace);
  };

  const handleSetReps = (reps: number): void => {
    setReps(reps);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Sider width="260px" style={siderStyle}>
            <div style={siderContainerStyle}>
              <Title level={4} style={titleStyle}>
                Select Exercise
              </Title>
              <div style={siderContentStyle}>
                <ExerciseList handleSetExercise={handleSetExercise} />
                <ControlPanel showCamera={showCamera} setShowCamera={setShowCamera} />
              </div>
            </div>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <div style={canvasContainerStyle}>
                <Canvas showCamera={showCamera} />
              </div>
              <div style={timerContainerStyle}>
                <ProgressIndicator
                  reps={reps}
                  pace={pace}
                  exerciseState={exerciseState}
                  handleSetExerciseState={handleSetExerciseState}
                />
              </div>
            </Content>
          </Layout>
          <Sider width="260px" style={siderStyle}>
            <div style={siderContainerStyle}>
              <div style={siderContentStyle}>
                <SettingsPanel
                  reps={reps}
                  pace={pace}
                  exercise={selectedExercise}
                  exerciseState={exerciseState}
                  handleSetExerciseState={handleSetExerciseState}
                  handleSetPace={handleSetPace}
                  handleSetReps={handleSetReps}
                />
              </div>
            </div>
          </Sider>
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
