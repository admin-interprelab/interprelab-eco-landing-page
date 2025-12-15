
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Scale } from 'lucide-react';
import { ClassificationChecklist } from '../Diagrams';

export const WorkerClassification: React.FC = () => {
    return (
        <section id="classification" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-card text-muted-foreground text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-border">
                            <Scale size={14}/> LEGAL FRAMEWORK
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">Employee vs. Contractor</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                           Whether under U.S. IRS guidelines or Mexico's Federal Labor Law, the key determinant of employment is <strong>control</strong>. When a company controls how you work, when you get paid, and your schedule, you are an employee.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Yet, the industry standard relies on <strong>misclassification</strong>. Interpreters are treated as independent contractors to deny minimum wage, overtime pay, and protections. Mexico's Telework Act (NOM-037) explicitly grants remote workers the "right to disconnect" and equipment costs—rights that are systematically ignored in this cross-border loophole.
                        </p>
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-r-lg">
                             <p className="text-stone-800 dark:text-red-100 font-medium italic">
                                "If the company controls what the worker does and how they do it, that points to employment."
                             </p>
                             <p className="text-xs text-red-800 dark:text-red-300 mt-2 font-bold uppercase">— IRS Guidelines</p>
                        </div>
                    </div>
                    <div>
                        <ClassificationChecklist />
                    </div>
                </div>
            </div>
        </section>
    );
};
