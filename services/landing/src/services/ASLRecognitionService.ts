
// src/services/ASLRecognitionService.ts
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { gestures } from './asl-gestures';

interface GestureEstimate {
  name: string;
  score: number;
}

class ASLRecognitionService {
  private net: handpose.HandPose | null = null;
  private gestureEstimator: fp.GestureEstimator | null = null;

  async loadModel(): Promise<void> {
    if (!this.net) {
      this.net = await handpose.load();
    }
    if (!this.gestureEstimator) {
      this.gestureEstimator = new fp.GestureEstimator(gestures);
    }
  }

  async estimateSign(videoElement: HTMLVideoElement): Promise<string | null> {
    if (!this.net || !this.gestureEstimator) {
      await this.loadModel();
    }

    const hand = await this.net!.estimateHands(videoElement);
    if (hand.length > 0) {
      // @tensorflow-models/handpose returns landmarks as arrays [x, y, z], which is compatible with fingerpose
      const estimatedGestures = await this.gestureEstimator!.estimate(hand[0].landmarks, 6.5);
      
      if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
        const scores = estimatedGestures.gestures.map(p => p.score);
        const maxScoreIndex = scores.indexOf(Math.max(...scores));
        return estimatedGestures.gestures[maxScoreIndex].name;
      }
    }
    return null;
  }
}

export default new ASLRecognitionService();
