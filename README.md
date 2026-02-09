# Life Screenshot Organizer – Project Story

## Inspiration

We noticed that people take screenshots constantly — whether for **shopping**, **studying**, or saving **important information** — yet most screenshots **get forgotten or never acted upon**.  

We asked ourselves:  

> "What if screenshots could tell us *why* they were taken and suggest actionable steps?"  

This inspired **Life Screenshot Organizer**, a system that turns **passive screenshots into actionable insights**, helping users reduce digital clutter and act on what they save.

---

## What it does

**Life Screenshot Organizer** is an AI-powered system that:

1. **Detects Intent** – Each screenshot is assigned an intent:  
   - `buy` → for shopping/comparison  
   - `study` → lecture slides, notes  
   - `remember` → quotes, events  

   Gemini 3 Flash Preview outputs a confidence score \(C \in [0,1]\):  

   $$
   I, C = \text{Gemini3}(\text{screenshot})
   $$

2. **Groups Related Screenshots** – Screenshots with similar categories and intents are clustered together. The cluster size is:  

   $$
   |Cluster_k| = \sum_{i=1}^{n} \mathbf{1}(category_i = k)
   $$

3. **Suggests One Smart Action** – For example:  
   - "You saved 5 laptops. Want a comparison table?"  
   - "These study slides are related. Generate revision notes?"  

All reasoning, clustering, and action suggestion is handled **entirely by Gemini 3 Flash Preview**, without OCR or extra comparison logic.

---

## How We Built It

- **Frontend:** HTML + CSS + Vanilla JavaScript for a fast, clean MVP.  
- **Backend:** Node.js + Express for file uploads and metadata storage.  
- **AI Engine:** Gemini 3 Flash Preview for multimodal reasoning.  
- **Storage:** Local JSON files store screenshot metadata:

```json
{
  "image_name": "screenshot1.png",
  "intent": "buy",
  "category": "laptop",
  "cluster_id": 1,
  "action_status": "pending"
}
