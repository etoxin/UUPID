# **UUPID: Universally Unique Pronounceable Identifier**

## **Human-Friendly Identifiers That Just Work**

**UUPID (Universally Unique Pronounceable Identifier)** is a new standard for creating unique identifiers that are easy for humans to read, say, and remember, all while being cryptographically robust. Unlike traditional UUIDs that are tough for people to work with, UUPIDs are built for human interaction.

## **Why UUPID?**

Traditional UUIDs (like a1b2c3d4-e5f6-7890-1234-567890abcdef) are excellent for machines, offering unmatched uniqueness for distributed systems. But for humans, they're a headache:

* **Hard to Read:** A jumble of numbers and letters.  
* **Impossible to Remember:** They have no inherent meaning or structure.  
* **Prone to Errors:** It's easy to misread or mistype them, especially when communicated verbally (e.g., over the phone for customer support).

UUPID solves these problems by turning complex random data into a sequence of pronounceable, memorable segments. This makes identifiers genuinely user-friendly without compromising their crucial uniqueness or integrity.

## **Key Features**

* **Pronounceable Units:** UUPIDs are built from a carefully chosen dictionary of **2, 3, and 4-letter sound combinations** (e.g., Quan, Tron, Wise). We select these units because they flow naturally when put together.  
* **Case-Preserving Segments:** The **exact casing of each pronounceable unit, as it appears in the official UUPID dictionary**, is maintained in the final UUPID string (e.g., if the dictionary entry is "Test", it appears as "Test"; if "TEST", it appears as "TEST"). This allows for varied visual styles within the standard.  
* **Hyphenated Segments:** We join units with hyphens (e.g., Myri-Ador-Able). This segmentation makes the ID easier to read and parse.  
* **Robust Collision Resistance:** UUPIDs offer an exceptionally high level of uniqueness, with approximately **126 bits of random entropy**. By using a large, bias-free dictionary and a cryptographically secure random number generator (CSPRNG), the chance of accidental collision is incredibly low.

## **How It Works**

The UUPID standard precisely transforms high-entropy random data into its human-friendly string format:

1. **The Pronounceable Unit Dictionary:** At its heart is a **publicly specified dictionary** containing only 2, 3, and 4-letter pronounceable units. **This dictionary also defines the exact casing for each unit** (e.g., "aqua", "Aqua", or "AQUA" could be distinct entries). The dictionary's size (e.g., 8,192 to 16,384 entries) determines how much entropy each unit provides.  
2. **Entropy Generation:** A **cryptographically secure random number generator** creates approximately **126 bits of raw random entropy**. This forms the core random data of the identifier.  
3. **Bias-Free Unit Selection:** All random bits are precisely mapped to indices within the Pronounceable Unit Dictionary. A **bias-free algorithm** ensures every unit has an equal chance of being picked. Based on the dictionary's size, 9 to 10 units are chosen to complete the UUPID.  
4. **Formatting:** Each selected unit is used **exactly as it appears in the dictionary**, preserving its original casing. These units are then joined with **hyphens** (e.g., Aqua-Blit-Cron...) to form the final UUPID string.

This rigorous process ensures UUPIDs are not only unique and unpredictable but also intuitively readable, memorable, and robust against common human errors.

## **Size & Comparison to UUID v4**

By strictly using 2, 3, and 4-letter units, the average unit length will be close to **3 characters**.

* **Pronounceable Unit Dictionary Size:** We aim for N≥8,192 entries (13 bits/unit) or N≥16,384 entries (14 bits/unit).  
* **Units Needed:** 9 to 10 units are selected to embed the ≈126 random bits.

**Estimated UUPID Length:**

* For 10 units: (10 units×3 chars/unit)+(9 hyphens)=30+9=39 characters.  
* For 9 units: (9 units×3 chars/unit)+(8 hyphens)=27+8=35 characters.

A UUPID string will generally be **between 35 and 39 characters in length**.  
**Comparison to UUID v4:**

| Feature | UUID v4 (Standard) | UUPID (Universally Unique Pronounceable) |
| :---- | :---- | :---- |
| **Readability** | Poor (abstract hex) | **Excellent (pronounceable words)** |
| **Memorability** | None | **High** |
| **Pronounceable** | No | **Yes** |
| **Entropy (Random)** | \~122 bits | **\~126 bits** |
| **Error Detection** | None built-in | None built-in |
| **Length** | 36 characters (with hyphens) | **35 \- 39 characters** |
| **Format** | xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx | Word-Word-Word-...-Word |
| **Collision Risk** | Practically Zero | **Practically Zero** |

UUPIDs offer a substantial leap in usability for humans with virtually no change in string length compared to a standard hyphenated UUID.

## **UUPID Examples**

These examples use 2, 3, and 4-letter units, with their casing preserved as defined in the dictionary, and hyphenated.

1. GOLD-En-Riva-Swif-Tide-Blom-Eria-Shor-Line-Vist (39 characters)  
2. CYBR-Quest-Logi-Grid-Fush-Code-Nexa-Prim-View-Poin (39 characters)  
3. AQUA-Flum-PLEX-STUN-rela-CREA-moRA-NOMI-COda-pure (39 characters)  
4. VENT-Ure-PATH-trek-FIND-more-AUra-ZONE-link-STAR (39 characters)

## **Usage**

This repository currently contains the **specification and design documents** for the UUPID standard. The reference implementation for generating and validating UUPIDs is under development.  
Once complete, this section will provide detailed instructions and code examples for using the UUPID library in various programming languages.  
// Example of what the code might look like (Node.js)  
/\*  
const uupid\_lib \= require('uupid-generator');

// Generate a new UUPID  
const newUUPID \= uupid\_lib.generate();  
console.log(\`Generated UUPID: ${newUUPID}\`);

// UUPID does not include a built-in checksum.  
// If error detection is required for your use case,  
// it should be implemented at the application level.  
\*/

## **Installation**

The UUPID reference implementation libraries are currently under development. This section will be updated with installation instructions (e.g., npm, pip, composer commands) once the packages are published.

## **Contributing**

We welcome contributions to the UUPID standard and its reference implementations\! Please see the CONTRIBUTING.md file for details.

## **License**

This project is licensed under the [MIT License](http://docs.google.com/LICENSE.md) \- see the LICENSE.md file for details.
