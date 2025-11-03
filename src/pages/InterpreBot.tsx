/**
 * Refactored InterpreBot Page
 * Now uses modular architecture for better maintainability
 */

import { Layout } from "@/components/Layout";
import { InterpreBotUI } from "@/components/InterpreBotUI";

/**
 * InterpreBot Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the existing InterpreBot UI component
 */
const InterpreBot = () => {
  return (
    <Layout>
      <InterpreBotUI />
    </Layout>
  );
};

export default InterpreBot;
