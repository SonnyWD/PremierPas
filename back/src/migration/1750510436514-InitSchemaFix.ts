import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchemaFix1750510436514 implements MigrationInterface {
  name = 'InitSchemaFix1750510436514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "baby_daily" ("id" SERIAL NOT NULL, "dateRecorded" TIMESTAMP NOT NULL DEFAULT now(), "sleepDurationHours" numeric(4,2), "lastFeed" TIMESTAMP, "babyId" integer, CONSTRAINT "PK_46ac57113f528b7740cc74e9293" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "baby_measure" ("id" SERIAL NOT NULL, "dateMesure" TIMESTAMP NOT NULL DEFAULT now(), "weightKg" numeric(5,2), "sizeCm" numeric(5,2), "temperatureC" numeric(4,2), "babyId" integer, CONSTRAINT "PK_8c8842d98b832c431bdf93aa94e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointement_type" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_2eb6ef20896817ae9de10b4d9f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medical_appointement" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "hour" TIME NOT NULL, "reason" character varying NOT NULL, "description" text NOT NULL, "userId" integer, "pregnancyId" integer, "babyId" integer, "appointementTypeId" integer, CONSTRAINT "PK_1879d20ab2a7b5722b4f7a97aa9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "baby" ("id" SERIAL NOT NULL, "birthDate" TIMESTAMP, "firstName" character varying DEFAULT '', "pregnancyId" integer, CONSTRAINT "PK_08ff41c7cb75f0073eab526ba52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pregnancy_status_enum" AS ENUM('a accouché', 'en cours', 'interrompue')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pregnancy" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP, "status" "public"."pregnancy_status_enum" NOT NULL DEFAULT 'en cours', "userId" integer, CONSTRAINT "PK_8a65db0e3c36aa02c739c453dec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mood" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_cd069bf46deedf0ef3a7771f44b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_baby" ("id" SERIAL NOT NULL, "typeMedia" character varying NOT NULL, "url" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_02b34cebe579fe5efccc3adfb82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer_form" ("id" SERIAL NOT NULL, "content" text NOT NULL, "reason" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_97e9008b34aa3ccf20ef58431c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "questionText" text NOT NULL, "suggestions" json NOT NULL, "quizId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "theme" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_todo" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "completed" boolean NOT NULL DEFAULT false, "isCustom" boolean NOT NULL DEFAULT true, "suggestedTodoKey" integer, "userId" integer, CONSTRAINT "PK_6c846304fe1cae810a0b08372f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_be5a1fccc1f28b63566b5fdd5f" ON "user_todo" ("userId", "suggestedTodoKey") WHERE "suggestedTodoKey" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE "like_comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "commentId" integer, "userId" integer, CONSTRAINT "PK_307553e232b4620fde327c59eb5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "userId" integer, "publicationId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "like_publication" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "publicationId" integer, "userId" integer, CONSTRAINT "PK_6d47f5d8f82d6a4c5be1b80e347" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publication" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "publicationDate" date NOT NULL, "userId" integer, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "sendingDate" TIMESTAMP NOT NULL DEFAULT now(), "isDeletedBySender" boolean NOT NULL DEFAULT false, "isDeletedByReceiver" boolean NOT NULL DEFAULT false, "id_envoyeur" integer, "id_receveur" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sponsorship" ("id" SERIAL NOT NULL, "sponsorshipDate" TIMESTAMP NOT NULL, "id_utilisateur_parrain" integer, "id_utilisateur_parrainage" integer, CONSTRAINT "PK_b20281101fc28f90ac116a9e660" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tool" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "iconName" character varying NOT NULL, "path" character varying NOT NULL, "keywords" character varying NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "access_content" ("id" SERIAL NOT NULL, "contentId" integer NOT NULL, "dateDeblocage" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_bb84aa3e5bed202019ff8391929" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'premium')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_type_profil_enum" AS ENUM('femme_enceinte', 'parent', 'autre')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "date_naissance" TIMESTAMP, "email" character varying NOT NULL, "mot_de_passe" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "suggested_name" json, "point" integer NOT NULL DEFAULT '0', "referralCode" character varying, "premiumUntil" TIMESTAMP, "lastLogin" TIMESTAMP WITH TIME ZONE DEFAULT now(), "type_profil" "public"."user_type_profil_enum" NOT NULL, "lastLogOut" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "creationDate" TIMESTAMP NOT NULL, "author" character varying NOT NULL, "imageUrl" character varying, "adminId" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "notificationType" character varying NOT NULL, "message" character varying NOT NULL, "duration" TIMESTAMP NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_tools_tool" ("userId" integer NOT NULL, "toolId" integer NOT NULL, CONSTRAINT "PK_3202f1ff7ec3d614cfbd9933151" PRIMARY KEY ("userId", "toolId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49909da5b5660c395e15150c12" ON "user_favorite_tools_tool" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19c0b417ec1b964e04e5e16232" ON "user_favorite_tools_tool" ("toolId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "baby_daily" ADD CONSTRAINT "FK_2ccbdc2c18233a5fa0b5c2382c2" FOREIGN KEY ("babyId") REFERENCES "baby"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "baby_measure" ADD CONSTRAINT "FK_531b1a09ab299164f1be4eaacb4" FOREIGN KEY ("babyId") REFERENCES "baby"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" ADD CONSTRAINT "FK_6f74cb6846215da42d414307dd8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" ADD CONSTRAINT "FK_31dc56f7cbcfa81087b610c0e20" FOREIGN KEY ("pregnancyId") REFERENCES "pregnancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" ADD CONSTRAINT "FK_2bf259391ab25ebcc1bc444158a" FOREIGN KEY ("babyId") REFERENCES "baby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" ADD CONSTRAINT "FK_a2b990857bb408357dfe7165996" FOREIGN KEY ("appointementTypeId") REFERENCES "appointement_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "baby" ADD CONSTRAINT "FK_f39d11ee0c01f6aea1492ff2153" FOREIGN KEY ("pregnancyId") REFERENCES "pregnancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pregnancy" ADD CONSTRAINT "FK_f6f91dea66e93bbd921fba8d3ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "mood" ADD CONSTRAINT "FK_063b678cbb2c84dfd95dff5da22" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_baby" ADD CONSTRAINT "FK_875dcd9f63f0031f64b9d6a89ae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_form" ADD CONSTRAINT "FK_029513f0c3866a5545813c962ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "FK_52c158a608620611799fd63a927" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_todo" ADD CONSTRAINT "FK_6850d9b5ee641900861ca259884" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_2f5824ee63b58747dc99f3283ae" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" ADD CONSTRAINT "FK_cb85953b04dd87a25b3475c5f2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_7a3ab4c780dd39723d6e64048f0" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_432bba105a98799096fd13050f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_4cd56215896af6dcccfe45e74a0" FOREIGN KEY ("id_envoyeur") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_b2bb1cd2e865859377efc1833f7" FOREIGN KEY ("id_receveur") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sponsorship" ADD CONSTRAINT "FK_28432b2515de89f914da2743529" FOREIGN KEY ("id_utilisateur_parrain") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sponsorship" ADD CONSTRAINT "FK_e35c5ed1ba4f6150aa1b71ce444" FOREIGN KEY ("id_utilisateur_parrainage") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_content" ADD CONSTRAINT "FK_58e380977ca5eb6ecb2f5ab44f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_tools_tool" ADD CONSTRAINT "FK_49909da5b5660c395e15150c123" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_tools_tool" ADD CONSTRAINT "FK_19c0b417ec1b964e04e5e162329" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_tools_tool" DROP CONSTRAINT "FK_19c0b417ec1b964e04e5e162329"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_tools_tool" DROP CONSTRAINT "FK_49909da5b5660c395e15150c123"`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_content" DROP CONSTRAINT "FK_58e380977ca5eb6ecb2f5ab44f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sponsorship" DROP CONSTRAINT "FK_e35c5ed1ba4f6150aa1b71ce444"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sponsorship" DROP CONSTRAINT "FK_28432b2515de89f914da2743529"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_b2bb1cd2e865859377efc1833f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_4cd56215896af6dcccfe45e74a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_432bba105a98799096fd13050f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_7a3ab4c780dd39723d6e64048f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_cb85953b04dd87a25b3475c5f2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_comment" DROP CONSTRAINT "FK_2f5824ee63b58747dc99f3283ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_todo" DROP CONSTRAINT "FK_6850d9b5ee641900861ca259884"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz" DROP CONSTRAINT "FK_52c158a608620611799fd63a927"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_form" DROP CONSTRAINT "FK_029513f0c3866a5545813c962ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_baby" DROP CONSTRAINT "FK_875dcd9f63f0031f64b9d6a89ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mood" DROP CONSTRAINT "FK_063b678cbb2c84dfd95dff5da22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pregnancy" DROP CONSTRAINT "FK_f6f91dea66e93bbd921fba8d3ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "baby" DROP CONSTRAINT "FK_f39d11ee0c01f6aea1492ff2153"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" DROP CONSTRAINT "FK_a2b990857bb408357dfe7165996"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" DROP CONSTRAINT "FK_2bf259391ab25ebcc1bc444158a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" DROP CONSTRAINT "FK_31dc56f7cbcfa81087b610c0e20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointement" DROP CONSTRAINT "FK_6f74cb6846215da42d414307dd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "baby_measure" DROP CONSTRAINT "FK_531b1a09ab299164f1be4eaacb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "baby_daily" DROP CONSTRAINT "FK_2ccbdc2c18233a5fa0b5c2382c2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_19c0b417ec1b964e04e5e16232"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_49909da5b5660c395e15150c12"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_tools_tool"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "article"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_type_profil_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "access_content"`);
    await queryRunner.query(`DROP TABLE "tool"`);
    await queryRunner.query(`DROP TABLE "sponsorship"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "publication"`);
    await queryRunner.query(`DROP TABLE "like_publication"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "like_comment"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be5a1fccc1f28b63566b5fdd5f"`,
    );
    await queryRunner.query(`DROP TABLE "user_todo"`);
    await queryRunner.query(`DROP TABLE "quiz"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "answer_form"`);
    await queryRunner.query(`DROP TABLE "media_baby"`);
    await queryRunner.query(`DROP TABLE "mood"`);
    await queryRunner.query(`DROP TABLE "pregnancy"`);
    await queryRunner.query(`DROP TYPE "public"."pregnancy_status_enum"`);
    await queryRunner.query(`DROP TABLE "baby"`);
    await queryRunner.query(`DROP TABLE "medical_appointement"`);
    await queryRunner.query(`DROP TABLE "appointement_type"`);
    await queryRunner.query(`DROP TABLE "baby_measure"`);
    await queryRunner.query(`DROP TABLE "baby_daily"`);
  }
}
