const KEY = "lr_game_state_v1";

const SCENE_ORDER = [
    "Forest",
    "Cabin",
    "Kitchen",
    "Bedroom",
    "Outside",
    "Finale",
];

const defaultState = {
    startedAt: null,
    currentScene: "Forest",
    farthestScene: "Forest",
    flags: {},
};

export function resetGameState() {
    localStorage.removeItem(KEY);
}

export function getGameState() {
    const raw = localStorage.getItem(KEY);
    if(!raw) return { ...defaultState };
    try {
        return { ...defaultState, ...JSON.parse(raw) };
    } catch {
        return { ...defaultState };
    }
}

export function setGameState(next) {
    localStorage.setItem(KEY, JSON.stringify(next));
}

export function markGameStarted() {
    const s = getGameState();
    const next = {
        ...s,
        startedAt: s.startedAt ?? Date.now(),
        currentScene: "Forest",
        farthestScene: s.farthestScene === "Forest" ? "Forest" : s.farthestScene,
    };
    setGameState(next);
}

export function updateProgress(sceneName) {
    const s = getGameState();

    //if you pass a sceneName not in the list, we still track it as current,
    //but we won't advance farthest incorrectly.
    const currentIndex = SCENE_ORDER.indexOf(sceneName);
    const farthestIndex = SCENE_ORDER.indexOf(s.farthestScene);

    const newFarthest = 
    currentIndex !== -1 && currentIndex > farthestIndex ? sceneName : s.farthestScene;

    setGameState({
        ...s,
        startedAt: s.startedAt ?? Date.now(),
        currentScene: sceneName,
        farthestScene: newFarthest,
    });
}

//Helper exports for the UI
export function getSceneList() {
    return SCENE_ORDER.slice();
}

export function getTotalScenes() {
    return SCENE_ORDER.length - 1;
 }