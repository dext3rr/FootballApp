using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballApp.API.Migrations
{
    public partial class Changed_SeasonTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SeasonTeams",
                table: "SeasonTeams");

            migrationBuilder.RenameTable(
                name: "SeasonTeams",
                newName: "SeasonsTeams");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeasonsTeams",
                table: "SeasonsTeams",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SeasonsTeams",
                table: "SeasonsTeams");

            migrationBuilder.RenameTable(
                name: "SeasonsTeams",
                newName: "SeasonTeams");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeasonTeams",
                table: "SeasonTeams",
                column: "Id");
        }
    }
}
