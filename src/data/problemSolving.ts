import type { Topic } from '../types';

export const leetcode = {
  solved: 400,
  suffix: '+',
  label: 'LeetCode Problems',
  username: 'VanshBajaj94',
  url: 'https://leetcode.com/u/VanshBajaj94/',
};

/**
 * Verified difficulty split. Leave as `null` until you have the real numbers (copy them from your LeetCode profile),
 * or set VITE_LEETCODE_STATS_URL to an endpoint that returns them. Nothing is shown while this is empty.
 */
export const leetcodeDifficulty: { easy: number; medium: number; hard: number } | null = null;

export const codingPlatforms = [
  { id: 'leetcode', label: 'LeetCode', handle: leetcode.username, url: leetcode.url },
  { id: 'github', label: 'GitHub', handle: 'mevanshbajaj', url: 'https://github.com/mevanshbajaj/' },
];

export const topics: Topic[] = [
  { id: 'arrays', label: 'Arrays', blurb: 'Linear data and index logic' },
  { id: 'strings', label: 'Strings', blurb: 'Text processing and patterns' },
  { id: 'trees', label: 'Trees', blurb: 'Hierarchies and recursion' },
  { id: 'graphs', label: 'Graphs', blurb: 'Nodes, edges and traversal' },
  { id: 'dp', label: 'Dynamic Programming', blurb: 'Overlapping subproblems' },
];
