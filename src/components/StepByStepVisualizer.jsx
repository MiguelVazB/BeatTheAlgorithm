import React from "react";
import "./componentStyles/StepByStepVisualizer.css";

const StepByStepVisualizer = ({ algorithm, steps, sampleData }) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Auto-play functionality
  React.useEffect(() => {
    let interval;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= steps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prevIndex + 1;
        });
      }, 3000); // Change step every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex >= steps.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex <= 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const goToStep = (index) => {
    setCurrentStepIndex(index);
    setIsPlaying(false);
  };

  // Get visual example data for current step
  const getVisualExample = () => {
    if (!sampleData.length || !steps.length) return null;

    const stepIndex = currentStepIndex;

    // Different visual states for different algorithms and steps
    switch (algorithm) {
      case 'bubble_sort':
        return getBubbleSortVisual(stepIndex);
      case 'selection_sort':
        return getSelectionSortVisual(stepIndex);
      case 'heap_sort':
        return getHeapSortVisual(stepIndex);
      case 'merge_sort':
        return getMergeSortVisual(stepIndex);
      default:
        return getDefaultVisual(stepIndex);
    }
  };

  const getBubbleSortVisual = (step) => {
    const data = [...sampleData];
    let comparisons = [];
    let swaps = [];

    if (step === 0) {
      return { data, comparisons: [], swaps: [], description: "Start with unsorted array" };
    } else if (step === 1) {
      comparisons = [0, 1];
      return { data, comparisons, swaps, description: "Compare the first element with the second element" };
    } else if (step === 2) {
      comparisons = [0, 1];
      if (data[0] > data[1]) {
        [data[0], data[1]] = [data[1], data[0]];
        swaps = [0, 1];
      }
      return { data, comparisons, swaps, description: "If first element is greater, swap them" };
    } else if (step === 3) {
      return { data, comparisons: [], swaps: [], description: "Otherwise, leave them as they are" };
    } else if (step === 4) {
      comparisons = [1, 2];
      return { data, comparisons, swaps: [], description: "Move to the next pair of adjacent elements" };
    } else if (step === 5) {
      comparisons = [1, 2];
      if (data[1] > data[2]) {
        [data[1], data[2]] = [data[2], data[1]];
        swaps = [1, 2];
      }
      return { data, comparisons, swaps, description: "Repeat comparison and swap if needed" };
    } else if (step === 6) {
      return { data: [34, 25, 12, 22, 11, 64, 90], comparisons: [], swaps: [], description: "Continue until you reach the end of the list" };
    } else if (step === 7) {
      return { data: [34, 25, 12, 22, 11, 64, 90], comparisons: [], swaps: [], description: "The largest element is now at the end" };
    } else if (step === 8) {
      comparisons = [0, 1];
      return { data: [34, 25, 12, 22, 11, 64, 90], comparisons, swaps: [], description: "Repeat for all elements except the last one" };
    } else if (step === 9) {
      return { data: [11, 12, 22, 25, 34, 64, 90], comparisons: [], swaps: [], description: "Each pass places next largest element in position" };
    } else if (step === 10) {
      return { data: [11, 12, 22, 25, 34, 64, 90], comparisons: [], swaps: [], description: "Continue until no more swaps are needed" };
    } else {
      return { data: [11, 12, 22, 25, 34, 64, 90], comparisons: [], swaps: [], description: "The list is now sorted" };
    }
  };

  const getSelectionSortVisual = (step) => {
    const data = [...sampleData];
    let comparisons = [];
    let swaps = [];
    let minIndex = 0;

    if (step === 0) {
      return { data, comparisons: [], swaps: [], description: "Start with unsorted array" };
    } else if (step === 1) {
      comparisons = [0, 1, 2, 3, 4, 5, 6];
      minIndex = 4;
      return { data, comparisons, swaps, minIndex, description: "Find the minimum element in the unsorted part" };
    } else if (step === 2) {
      return { data, comparisons: [], swaps: [], minIndex: 4, description: "Identify the leftmost element in the unsorted part" };
    } else if (step === 3) {
      [data[0], data[4]] = [data[4], data[0]];
      swaps = [0, 4];
      return { data: [11, 25, 12, 22, 64, 34, 90], comparisons: [], swaps, description: "Swap the minimum with the leftmost unsorted element" };
    } else if (step === 4) {
      return { data: [11, 25, 12, 22, 64, 34, 90], comparisons: [], swaps: [], description: "Minimum element is now in correct position" };
    } else if (step === 5) {
      return { data: [11, 25, 12, 22, 64, 34, 90], comparisons: [], swaps: [], description: "Move boundary of sorted part one element right" };
    } else if (step === 6) {
      comparisons = [1, 2, 3, 4, 5, 6];
      minIndex = 2;
      return { data: [11, 25, 12, 22, 64, 34, 90], comparisons, swaps: [], minIndex, description: "Repeat: Find minimum in remaining unsorted portion" };
    } else if (step === 7) {
      return { data: [11, 25, 12, 22, 64, 34, 90], comparisons: [], swaps: [], minIndex: 2, description: "Identify the new leftmost unsorted element" };
    } else if (step === 8) {
      [data[1], data[2]] = [data[2], data[1]];
      swaps = [1, 2];
      return { data: [11, 12, 25, 22, 64, 34, 90], comparisons: [], swaps, description: "Swap the new minimum with leftmost unsorted element" };
    } else if (step === 9) {
      return { data: [11, 12, 22, 25, 34, 64, 90], comparisons: [], swaps: [], description: "Continue until entire array is sorted" };
    } else {
      return { data: [11, 12, 22, 25, 34, 64, 90], comparisons: [], swaps: [], description: "Algorithm complete - all elements sorted" };
    }
  };

  const getHeapSortVisual = (step) => {
    const data = [...sampleData];
    let comparisons = [];
    let swaps = [];

    if (step === 0) {
      return { data, comparisons: [], swaps: [], description: "Start with unsorted array" };
    } else if (step === 1) {
      return { data, comparisons: [], swaps: [], description: "Identify the heap property: parent smaller than children" };
    } else if (step === 2) {
      return { data, comparisons: [3], swaps: [], description: "Start from the last non-leaf node" };
    } else if (step === 3) {
      comparisons = [3, 6, 7];
      return { data, comparisons, swaps: [], description: "Perform heapify operation on current node" };
    } else if (step === 4) {
      comparisons = [3, 1];
      return { data, comparisons, swaps: [], description: "Compare parent with its left child" };
    } else if (step === 5) {
      comparisons = [3, 5];
      return { data, comparisons, swaps: [], description: "Compare parent with its right child" };
    } else if (step === 6) {
      swaps = [3, 5];
      return { data: [12, 11, 13, 7, 6, 5, 15], comparisons: [], swaps, description: "Swap with smaller child if necessary" };
    } else if (step === 7) {
      return { data: [12, 11, 13, 7, 6, 5, 15], comparisons: [], swaps: [], description: "Work backwards towards the root node" };
    } else if (step === 8) {
      return { data: [15, 11, 13, 7, 6, 5, 12], comparisons: [], swaps: [], description: "Repeat heapify until entire heap is built" };
    } else if (step === 9) {
      return { data: [15, 11, 13, 7, 6, 5, 12], comparisons: [], swaps: [], description: "Smallest element is now at root of heap" };
    } else if (step === 10) {
      return { data: [15, 11, 13, 7, 6, 5, 12], comparisons: [], swaps: [], description: "Extract root element and place in sorted part" };
    } else if (step === 11) {
      swaps = [0, 6];
      return { data: [12, 11, 13, 7, 6, 5, 15], comparisons: [], swaps, description: "Replace root with last element in unsorted part" };
    } else if (step === 12) {
      return { data: [12, 11, 13, 7, 6, 5, 15], comparisons: [], swaps: [], description: "Reduce heap size by 1" };
    } else if (step === 13) {
      comparisons = [0, 1, 2];
      return { data: [12, 11, 13, 7, 6, 5, 15], comparisons, swaps: [], description: "Heapify the new root to maintain heap property" };
    } else if (step === 14) {
      return { data: [13, 11, 7, 5, 6, 12, 15], comparisons: [], swaps: [], description: "Repeat extraction and heapify until heap size is 1" };
    } else if (step === 15) {
      return { data: [5, 6, 7, 11, 12, 13, 15], comparisons: [], swaps: [], description: "All elements are now sorted" };
    } else {
      return { data: [5, 6, 7, 11, 12, 13, 15], comparisons: [], swaps: [], description: "Algorithm complete" };
    }
  };

  const getMergeSortVisual = (step) => {
    const data = [...sampleData];
    let comparisons = [];
    let swaps = [];
    let subarrays = [];

    if (step === 0) {
      return { data, comparisons: [], swaps: [], subarrays: [], description: "Start with unsorted array" };
    } else if (step === 1) {
      subarrays = [[38], [27], [43], [3], [9], [82], [10]];
      return { data, comparisons: [], swaps: [], subarrays, description: "Divide the list into sublists of size 1" };
    } else if (step === 2) {
      return { data, comparisons: [], swaps: [], subarrays: [[38], [27], [43], [3], [9], [82], [10]], description: "Each sublist of size 1 is already sorted" };
    } else if (step === 3) {
      subarrays = [[27, 38], [3, 43], [9, 82], [10]];
      return { data, comparisons: [], swaps: [], subarrays, description: "Take first pair of adjacent sublists" };
    } else if (step === 4) {
      return { data, comparisons: [], swaps: [], subarrays: [[27, 38], [3, 43], [9, 82], [10]], description: "Merge them into sorted sublist of size 2" };
    } else if (step === 5) {
      return { data, comparisons: [], swaps: [], subarrays: [[27, 38], [3, 43], [9, 82], [10]], description: "Take the next pair of adjacent sublists" };
    } else if (step === 6) {
      return { data, comparisons: [], swaps: [], subarrays: [[27, 38], [3, 43], [9, 82], [10]], description: "Merge them into another sorted sublist of size 2" };
    } else if (step === 7) {
      subarrays = [[3, 27, 38, 43], [9, 10, 82]];
      return { data, comparisons: [], swaps: [], subarrays, description: "Now take pairs of size 2 sublists" };
    } else if (step === 8) {
      return { data, comparisons: [], swaps: [], subarrays: [[3, 27, 38, 43], [9, 10, 82]], description: "Merge each pair into sorted sublists of size 4" };
    } else if (step === 9) {
      return { data, comparisons: [], swaps: [], subarrays: [[3, 27, 38, 43], [9, 10, 82]], description: "Continue with larger sublist sizes" };
    } else if (step === 10) {
      return { data, comparisons: [], swaps: [], subarrays: [[3, 27, 38, 43], [9, 10, 82]], description: "Merge pairs of size 4 into size 8" };
    } else if (step === 11) {
      return { data, comparisons: [], swaps: [], subarrays: [[3, 27, 38, 43], [9, 10, 82]], description: "Merge pairs of size 8 into size 16" };
    } else if (step === 12) {
      subarrays = [[3, 9, 10, 27, 38, 43, 82]];
      return { data, comparisons: [], swaps: [], subarrays, description: "Continue until all elements are in one sorted list" };
    } else if (step === 13) {
      return { data: [3, 9, 10, 27, 38, 43, 82], comparisons: [], swaps: [], subarrays: [[3, 9, 10, 27, 38, 43, 82]], description: "The algorithm is complete" };
    } else {
      return { data: [3, 9, 10, 27, 38, 43, 82], comparisons: [], swaps: [], subarrays: [[3, 9, 10, 27, 38, 43, 82]], description: "Algorithm complete - all elements sorted" };
    }
  };

  const getDefaultVisual = (step) => {
    return { data: sampleData, comparisons: [], swaps: [], description: "Algorithm visualization" };
  };

  return (
    <div className="step-visualizer">
      <div className="step-display">
        <div className="step-counter">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
        <div className="step-content">
          {steps[currentStepIndex]}
        </div>
        <div className="current-step">
          {getVisualExample() && (
            <div className="step-example">
              <h4>Example:</h4>
              <p className="example-description">{getVisualExample().description}</p>
              <div className="array-visualization">
                {getVisualExample().data.map((value, index) => (
                  <div
                    key={index}
                    className={`array-element
                      ${getVisualExample().comparisons?.includes(index) ? 'comparing' : ''}
                      ${getVisualExample().swaps?.includes(index) ? 'swapping' : ''}
                      ${getVisualExample().minIndex === index ? 'minimum' : ''}
                    `}
                  >
                    {value}
                  </div>
                ))}
              </div>
              {getVisualExample().subarrays && getVisualExample().subarrays.length > 0 && (
                <div className="subarrays-visualization">
                  {getVisualExample().subarrays.map((subarray, subIndex) => (
                    <div key={subIndex} className="subarray">
                      [{subarray.join(', ')}]
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="step-controls">
        <button
          className="step-btn prev-btn"
          onClick={prevStep}
          disabled={steps.length === 0}
        >
          ← Previous
        </button>

        <button
          className="step-btn play-btn"
          onClick={togglePlay}
          disabled={steps.length === 0}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        <button
          className="step-btn next-btn"
          onClick={nextStep}
          disabled={steps.length === 0}
        >
          Next →
        </button>
      </div>

      <div className="step-indicators">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`step-indicator ${index === currentStepIndex ? 'active' : ''} ${index < currentStepIndex ? 'completed' : ''}`}
            onClick={() => goToStep(index)}
            title={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepByStepVisualizer;