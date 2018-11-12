export interface SeasonTeam {
    id: number;
    seasonId: number;
    teamId: number;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsConceded: number;
    yellowCards: number;
    redCards: number;
    points: number;
}
