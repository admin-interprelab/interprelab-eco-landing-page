// src/services/ASLRecognitionService.ts
import * as handpose from '@tensorflow-models/handpose';
import { GestureEstimator, GestureDescription } from 'fingerpose';
import { gestures } from './asl-gestures';

interface Keypoint3D {
  x: number;
  y: number;
  z: number;
}

interface GestureEstimate {
  name: string;
  score: number;
}

interface EstimateResult {
  poseData: Array<[string, string, string]>;
  gestures: GestureEstimate[];
}

class ASLRecognitionService {
  private net: handpose.HandPose | null = null;
  private gestureEstimator: GestureEstimator | null = null;

  async loadModel(): Promise<void> {
    if (!this.net) {
      this.net = await handpose.load();
    }
    if (!this.gestureEstimator) {
      this.gestureEstimator = new GestureEstimator(gestures as GestureDescription[]);
    }
  }

  async estimateSign(videoElement: HTMLVideoElement): Promise<string | null> {
    if (!this.net || !this.gestureEstimator) {
      await this.loadModel();
    }

    const hand = await this.net!.estimateHands(videoElement);
    if (hand.length > 0) {
      // Convert landmarks to Keypoint3D format expected by fingerpose
      const landmarks: Keypoint3D[] = hand[0].landmarks.map((point: [number, number, number]) => ({
        x: point[0],
        y: point[1],
        z: point[2]
      }));
      
      const estimatedGestures: EstimateResult = this.gestureEstimator!.estimate(landmarks, 6.5);
      if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
        const scores = estimatedGestures.gestures.map((p: GestureEstimate) => p.score);
        const maxScoreIndex = scores.indexOf(Math.max(...scores));
        return estimatedGestures.gestures[maxScoreIndex].name;
      }
    }
    return null;
  }
}

export default new ASLRecognitionService();