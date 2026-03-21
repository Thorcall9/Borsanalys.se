import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const EvolutionAnalysis = dynamic(() => import("./EvolutionAnalysis"));

export const metadata = createMetadata({
title: "Evolution – Aktieanalys 2025/2026",
description:
"Fullständig aktieanalys av Evolution AB. Dominerande B2B-position inom live casino, EBITDA-marginal >66%, P/E ~10x. Genomgång av UKGC-risk, marginaltrend, kapitalallokering och scenarier med målpris SEK 720.",
path: "/analyser/evolution-2025",
type: "article",
publishedTime: "2026-03-21",
author: "Carl Fredrik Thor",
});

export default function EvolutionPage() {
return <EvolutionAnalysis />;
}
