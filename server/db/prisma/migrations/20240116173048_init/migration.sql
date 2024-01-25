-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "lastWateredAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastFertilizedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastRepottedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastCleanedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "waterVolumeRequirement" INTEGER,
    "waterFrequencyRequirement" TEXT,
    "sunRequirement" TEXT,
    "soilRequirement" TEXT,
    "propagationType" TEXT,
    "flowers" TEXT,
    "growthRate" TEXT,
    "careLevel" TEXT,
    "poisonousToHumans" BOOLEAN,
    "poisonousToPets" BOOLEAN,
    "description" TEXT,
    "imageUrl" TEXT,
    "careGuideId" INTEGER,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareGuide" (
    "id" SERIAL NOT NULL,
    "watering" TEXT,
    "sunlight" TEXT,
    "pruning" TEXT,

    CONSTRAINT "CareGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT,
    "answer" TEXT,
    "plantId" INTEGER,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "plantId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_id_key" ON "Plant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_commonName_key" ON "Plant"("commonName");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_scientificName_key" ON "Plant"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "CareGuide_id_key" ON "CareGuide"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_id_key" ON "FAQ"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_careGuideId_fkey" FOREIGN KEY ("careGuideId") REFERENCES "CareGuide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
