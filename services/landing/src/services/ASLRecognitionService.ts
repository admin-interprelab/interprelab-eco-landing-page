// ASL Recognition temporarily disabled - missing dependencies
// TODO: Install @tensorflow-models/handpose and fingerpose or find alternatives

// Stub service that doesn't throw errors
class ASLRecognitionServiceStub {
  async loadModel(): Promise<void> {
    console.warn('ASL Recognition Service is disabled - missing dependencies (handpose, fingerpose)');
    return Promise.resolve();
  }

  async estimateSign(_videoElement: HTMLVideoElement): Promise<string | null> {
    console.warn('ASL Recognition Service is disabled');
    return Promise.resolve(null);
  }
}

export default new ASLRecognitionServiceStub();
