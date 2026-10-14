'use client';

import { useCallback, useEffect, useState } from 'react';
import { questions } from '../content/questions';
import { vocabularyQuestions } from '../content/vocabulary';
import type { LearningState } from '../domain/types';
import { createEmptyState } from './state';
import { LEARNING_STATE_CHANGED_EVENT, loadLearningState, saveLearningState } from './storage';

const knownIds = new Set([...questions, ...vocabularyQuestions].map((question) => question.id));

export function useLearningState() {
  const [state, setState] = useState<LearningState>(createEmptyState);
  const [message, setMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const reload = () => {
      if (!active) return;
      const loaded = loadLearningState(knownIds);
      setState(loaded.state);
      setMessage(loaded.message);
      setReady(true);
    };
    queueMicrotask(reload);
    window.addEventListener(LEARNING_STATE_CHANGED_EVENT, reload);
    return () => {
      active = false;
      window.removeEventListener(LEARNING_STATE_CHANGED_EVENT, reload);
    };
  }, []);

  const update = useCallback((next: LearningState | ((current: LearningState) => LearningState)) => {
    setState((current) => {
      const resolved = typeof next === 'function' ? next(current) : next;
      saveLearningState(resolved);
      return resolved;
    });
  }, []);

  return { state, update, ready, message, setMessage };
}
