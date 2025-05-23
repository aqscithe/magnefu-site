interface Task {
  id: string;
  title: string;
  time: string;
  timeValue: number; // 24-hour format as a number (e.g., 8.5 for 8:30 AM)
  description: string;
  position: number; // percentage position on timeline (0-100)
}

// Sample schedule data
const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Wake Up',
    time: '6:00 AM',
    timeValue: 6,
    description: 'Start the day fresh with a glass of water and some stretching.',
    position: 0,
  },
  {
    id: 'task-2',
    title: 'Gym Workout',
    time: '7:00 AM',
    timeValue: 7,
    description: 'Morning cardio and strength training to energize the day.',
    position: 10,
  },
  {
    id: 'task-3',
    title: 'Breakfast',
    time: '8:30 AM',
    timeValue: 8.5,
    description: 'Balanced breakfast with protein, fruits, and coffee.',
    position: 20,
  },
  {
    id: 'task-4',
    title: 'Work Session 1',
    time: '9:30 AM',
    timeValue: 9.5,
    description: 'Focus on the most important tasks of the day.',
    position: 30,
  },
  {
    id: 'task-5',
    title: 'Team Meeting',
    time: '11:30 AM',
    timeValue: 11.5,
    description: 'Weekly sync with the team to discuss progress and blockers.',
    position: 40,
  },
  {
    id: 'task-6',
    title: 'Lunch',
    time: '1:00 PM',
    timeValue: 13,
    description: 'Healthy lunch and a short walk to recharge.',
    position: 50,
  },
  {
    id: 'task-7',
    title: 'Work Session 2',
    time: '2:30 PM',
    timeValue: 14.5,
    description: 'Deep work on creative projects and problem-solving.',
    position: 60,
  },
  {
    id: 'task-8',
    title: 'Learning Time',
    time: '4:30 PM',
    timeValue: 16.5,
    description: 'Dedicated time for learning new skills and reading.',
    position: 70,
  },
  {
    id: 'task-9',
    title: 'Dinner',
    time: '6:30 PM',
    timeValue: 18.5,
    description: 'Dinner with family and catch up on the day.',
    position: 80,
  },
  {
    id: 'task-10',
    title: 'Personal Project',
    time: '8:00 PM',
    timeValue: 20,
    description: 'Working on a side project or hobby.',
    position: 90,
  },
  {
    id: 'task-11',
    title: 'Wind Down',
    time: '10:00 PM',
    timeValue: 22,
    description: 'Reading, meditation, and preparing for tomorrow.',
    position: 100,
  },
];

// Initialize the timeline
export function initTimeline() {
  const timeline = document.querySelector('.timeline-container');
  if (!timeline) return;

  // Create and position tasks
  createTasks();
  
  // Set up logo marker
  setupLogoMarker();
  
  // Set up control buttons
  setupControls();
  
  // Set initial position based on current time
  positionLogoBasedOnCurrentTime();
}

function createTasks() {
  const tasksContainer = document.querySelector('.timeline-tasks');
  if (!tasksContainer) return;
  
  // Add a slight margin from the edges (3% from each side)
  const positionWithMargin = (position: number) => {
    // Scale position from 0-100 to 3-97 to avoid the edges
    return 3 + (position * 0.94);
  };
  
  sampleTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.id = task.id;
    taskElement.textContent = task.title;
    
    // Apply the margin to position
    const adjustedPosition = positionWithMargin(task.position);
    taskElement.style.left = `${adjustedPosition}%`;
    
    taskElement.setAttribute('data-time', task.time);
    taskElement.setAttribute('data-description', task.description);
    
    taskElement.addEventListener('click', () => {
      selectTask(task.id);
      showTaskDetails(task);
      moveLogoToTask(task.id);
    });
    
    tasksContainer.appendChild(taskElement);
  });
}

function setupLogoMarker() {
  const track = document.querySelector('.timeline-track');
  if (!track) return;
  
  const logoMarker = document.createElement('div');
  logoMarker.className = 'logo-marker';
  
  const logoImg = document.createElement('img');
  logoImg.src = '/img/logo.png';
  logoImg.alt = 'Logo marker';
  
  logoMarker.appendChild(logoImg);
  track.appendChild(logoMarker);
}

function setupControls() {
  const controlsContainer = document.querySelector('.timeline-controls');
  if (!controlsContainer) return;
  
  const prevButton = document.createElement('button');
  prevButton.className = 'control-button prev-button';
  prevButton.textContent = 'Previous Task';
  prevButton.addEventListener('click', goToPreviousTask);
  
  const nextButton = document.createElement('button');
  nextButton.className = 'control-button next-button';
  nextButton.textContent = 'Next Task';
  nextButton.addEventListener('click', goToNextTask);
  
  const playButton = document.createElement('button');
  playButton.className = 'control-button play-button';
  playButton.textContent = 'Play Day';
  playButton.addEventListener('click', playDayAnimation);
  
  controlsContainer.appendChild(prevButton);
  controlsContainer.appendChild(playButton);
  controlsContainer.appendChild(nextButton);
}

function positionLogoBasedOnCurrentTime() {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  // Scale the current time to a percentage of the timeline (assuming 6AM to 11PM is shown)
  const startHour = 6; // 6AM
  const endHour = 22; // 10PM
  const totalHours = endHour - startHour;
  
  if (currentHour < startHour || currentHour > endHour) {
    // Outside of timeline hours, position at start or end
    const position = currentHour < startHour ? 0 : 100;
    setLogoPosition(position);
    return;
  }
  
  const position = ((currentHour - startHour) / totalHours) * 100;
  setLogoPosition(position);
  
  // Find nearest task and highlight it
  let nearestTask = sampleTasks[0];
  let smallestDifference = Math.abs(currentHour - nearestTask.timeValue);
  
  sampleTasks.forEach(task => {
    const difference = Math.abs(currentHour - task.timeValue);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      nearestTask = task;
    }
  });
  
  // Only highlight if within 30 minutes of the task
  if (smallestDifference <= 0.5) {
    selectTask(nearestTask.id);
    showTaskDetails(nearestTask);
  }
}

function selectTask(taskId: string) {
  // Clear previously selected task
  document.querySelectorAll('.task').forEach(t => {
    t.classList.remove('active');
  });
  
  // Mark the new task as active
  const taskElement = document.getElementById(taskId);
  if (taskElement) {
    taskElement.classList.add('active');
  }
}

function showTaskDetails(task: Task) {
  const detailsPanel = document.querySelector('.task-details');
  if (!detailsPanel) return;
  
  detailsPanel.innerHTML = `
    <h3>${task.title} - ${task.time}</h3>
    <p>${task.description}</p>
  `;
  
  detailsPanel.classList.add('visible');
}

function moveLogoToTask(taskId: string) {
  const taskElement = document.getElementById(taskId);
  if (!taskElement) return;
  
  const task = sampleTasks.find(t => t.id === taskId);
  if (!task) return;
  
  setLogoPosition(task.position);
}

function setLogoPosition(position: number) {
  const logoMarker = document.querySelector('.logo-marker');
  if (logoMarker) {
    // Apply the margin to position (same as for tasks)
    const adjustedPosition = 3 + (position * 0.94);
    (logoMarker as HTMLElement).style.left = `${adjustedPosition}%`;
  }
}

function getActiveTaskIndex(): number {
  const activeTask = document.querySelector('.task.active');
  if (!activeTask) return 0;
  
  const activeTaskId = activeTask.id;
  return sampleTasks.findIndex(task => task.id === activeTaskId);
}

function goToPreviousTask() {
  const currentIndex = getActiveTaskIndex();
  
  if (currentIndex <= 0) return; // Already at first task
  
  const prevTask = sampleTasks[currentIndex - 1];
  selectTask(prevTask.id);
  showTaskDetails(prevTask);
  moveLogoToTask(prevTask.id);
}

function goToNextTask() {
  const currentIndex = getActiveTaskIndex();
  
  if (currentIndex >= sampleTasks.length - 1 || currentIndex < 0) return; // At last task or no selection
  
  const nextTask = sampleTasks[currentIndex + 1];
  selectTask(nextTask.id);
  showTaskDetails(nextTask);
  moveLogoToTask(nextTask.id);
}

function playDayAnimation() {
  let currentIndex = 0;
  
  // First task
  selectTask(sampleTasks[currentIndex].id);
  showTaskDetails(sampleTasks[currentIndex]);
  moveLogoToTask(sampleTasks[currentIndex].id);
  
  // Disable control buttons during animation
  const controlButtons = document.querySelectorAll('.control-button');
  controlButtons.forEach(btn => {
    (btn as HTMLButtonElement).disabled = true;
  });
  
  // Animation interval
  const interval = setInterval(() => {
    currentIndex++;
    
    if (currentIndex >= sampleTasks.length) {
      clearInterval(interval);
      // Re-enable control buttons
      controlButtons.forEach(btn => {
        (btn as HTMLButtonElement).disabled = false;
      });
      return;
    }
    
    selectTask(sampleTasks[currentIndex].id);
    showTaskDetails(sampleTasks[currentIndex]);
    moveLogoToTask(sampleTasks[currentIndex].id);
  }, 2000); // Pause 2 seconds at each task
} 