import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson, Question, QuestionState, LessonProgress } from '../models/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private lessons: Lesson[] = [];
  private currentLessonId: number | null = null;
  private currentQuestionIndex: number = 0;
  private lessonProgressMap: Map<number, LessonProgress> = new Map();

  private currentLessonSubject = new BehaviorSubject<Lesson | null>(null);
  public currentLesson$ = this.currentLessonSubject.asObservable();

  private currentQuestionSubject = new BehaviorSubject<Question | null>(null);
  public currentQuestion$ = this.currentQuestionSubject.asObservable();

  private currentQuestionIndexSubject = new BehaviorSubject<number>(0);
  public currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();

  constructor() {
    this.initializeLessons();
  }

  private initializeLessons(): void {
    // Lesson 1: Sistema Sanitario Italiano
    this.lessons.push({
      id: 1,
      title: 'Sistema Sanitario Italiano e Normativa',
      questions: [
        {
          id: 'l1-q1',
          lessonId: 1,
          questionNumber: 1,
          text: 'In quale anno è stata istituito il Servizio Sanitario Nazionale (SSN)?',
          answers: [
            { id: 'l1-q1-a1', text: '1968', isCorrect: false },
            { id: 'l1-q1-a2', text: '1978', isCorrect: true },
            { id: 'l1-q1-a3', text: '1988', isCorrect: false },
            { id: 'l1-q1-a4', text: '1992', isCorrect: false }
          ]
        },
        {
          id: 'l1-q2',
          lessonId: 1,
          questionNumber: 2,
          text: 'Quale legge ha istituito il Servizio Sanitario Nazionale?',
          answers: [
            { id: 'l1-q2-a1', text: 'Legge 104/1992', isCorrect: false },
            { id: 'l1-q2-a2', text: 'Legge 833/1978', isCorrect: true },
            { id: 'l1-q2-a3', text: 'Legge 81/2008', isCorrect: false },
            { id: 'l1-q2-a4', text: 'Legge 196/2003', isCorrect: false }
          ]
        },
        {
          id: 'l1-q3',
          lessonId: 1,
          questionNumber: 3,
          text: 'Quale articolo della Costituzione italiana sancisce il diritto alla salute?',
          answers: [
            { id: 'l1-q3-a1', text: 'Articolo 32', isCorrect: true },
            { id: 'l1-q3-a2', text: 'Articolo 2', isCorrect: false },
            { id: 'l1-q3-a3', text: 'Articolo 13', isCorrect: false },
            { id: 'l1-q3-a4', text: 'Articolo 21', isCorrect: false }
          ]
        },
        {
          id: 'l1-q4',
          lessonId: 1,
          questionNumber: 4,
          text: 'Cosa significa SSN?',
          answers: [
            { id: 'l1-q4-a1', text: 'Servizio Sanitario Nazionale', isCorrect: true },
            { id: 'l1-q4-a2', text: 'Sistema Sanitario Nazionale', isCorrect: false },
            { id: 'l1-q4-a3', text: 'Sicurezza Sanitaria Nazionale', isCorrect: false },
            { id: 'l1-q4-a4', text: 'Sostegno Sanitario Nazionale', isCorrect: false }
          ]
        },
        {
          id: 'l1-q5',
          lessonId: 1,
          questionNumber: 5,
          text: 'Quale riforma ha introdotto la regionalizzazione del sistema sanitario?',
          answers: [
            { id: 'l1-q5-a1', text: 'Riforma del 1968', isCorrect: false },
            { id: 'l1-q5-a2', text: 'Riforma del 1978', isCorrect: false },
            { id: 'l1-q5-a3', text: 'Riforma del 1992-1993', isCorrect: true },
            { id: 'l1-q5-a4', text: 'Riforma del 2001', isCorrect: false }
          ]
        },
        {
          id: 'l1-q6',
          lessonId: 1,
          questionNumber: 6,
          text: 'Quali sono i principi fondamentali del SSN?',
          answers: [
            { id: 'l1-q6-a1', text: 'Universalità, uguaglianza, equità', isCorrect: true },
            { id: 'l1-q6-a2', text: 'Efficienza, profitto, competitività', isCorrect: false },
            { id: 'l1-q6-a3', text: 'Privatizzazione, mercato, concorrenza', isCorrect: false },
            { id: 'l1-q6-a4', text: 'Selettività, esclusività, riservatezza', isCorrect: false }
          ]
        },
        {
          id: 'l1-q7',
          lessonId: 1,
          questionNumber: 7,
          text: 'Chi è responsabile della programmazione sanitaria a livello regionale?',
          answers: [
            { id: 'l1-q7-a1', text: 'Il Ministero della Salute', isCorrect: false },
            { id: 'l1-q7-a2', text: 'La Regione', isCorrect: true },
            { id: 'l1-q7-a3', text: 'L\'ASL', isCorrect: false },
            { id: 'l1-q7-a4', text: 'Il Comune', isCorrect: false }
          ]
        },
        {
          id: 'l1-q8',
          lessonId: 1,
          questionNumber: 8,
          text: 'Cosa significa ASL?',
          answers: [
            { id: 'l1-q8-a1', text: 'Azienda Sanitaria Locale', isCorrect: true },
            { id: 'l1-q8-a2', text: 'Assistenza Sanitaria Locale', isCorrect: false },
            { id: 'l1-q8-a3', text: 'Autorità Sanitaria Locale', isCorrect: false },
            { id: 'l1-q8-a4', text: 'Agenzia Sanitaria Locale', isCorrect: false }
          ]
        },
        {
          id: 'l1-q9',
          lessonId: 1,
          questionNumber: 9,
          text: 'Quale organo ha competenza esclusiva in materia di tutela della salute?',
          answers: [
            { id: 'l1-q9-a1', text: 'Stato e Regioni', isCorrect: true },
            { id: 'l1-q9-a2', text: 'Solo lo Stato', isCorrect: false },
            { id: 'l1-q9-a3', text: 'Solo le Regioni', isCorrect: false },
            { id: 'l1-q9-a4', text: 'I Comuni', isCorrect: false }
          ]
        },
        {
          id: 'l1-q10',
          lessonId: 1,
          questionNumber: 10,
          text: 'La legge 833/1978 ha sostituito quale sistema sanitario precedente?',
          answers: [
            { id: 'l1-q10-a1', text: 'Il sistema mutualistico', isCorrect: true },
            { id: 'l1-q10-a2', text: 'Il sistema privato', isCorrect: false },
            { id: 'l1-q10-a3', text: 'Il sistema regionale', isCorrect: false },
            { id: 'l1-q10-a4', text: 'Il sistema federale', isCorrect: false }
          ]
        },
        {
          id: 'l1-q11',
          lessonId: 1,
          questionNumber: 11,
          text: 'Quale documento definisce i Livelli Essenziali di Assistenza (LEA)?',
          answers: [
            { id: 'l1-q11-a1', text: 'DPCM', isCorrect: true },
            { id: 'l1-q11-a2', text: 'Decreto Legge', isCorrect: false },
            { id: 'l1-q11-a3', text: 'Legge Regionale', isCorrect: false },
            { id: 'l1-q11-a4', text: 'Circolare Ministeriale', isCorrect: false }
          ]
        },
        {
          id: 'l1-q12',
          lessonId: 1,
          questionNumber: 12,
          text: 'Cosa sono i LEA?',
          answers: [
            { id: 'l1-q12-a1', text: 'Livelli Essenziali di Assistenza', isCorrect: true },
            { id: 'l1-q12-a2', text: 'Livelli Erogativi di Assistenza', isCorrect: false },
            { id: 'l1-q12-a3', text: 'Livelli Economici di Assistenza', isCorrect: false },
            { id: 'l1-q12-a4', text: 'Livelli Etici di Assistenza', isCorrect: false }
          ]
        },
        {
          id: 'l1-q13',
          lessonId: 1,
          questionNumber: 13,
          text: 'Quale riforma ha introdotto l\'autonomia gestionale degli ospedali?',
          answers: [
            { id: 'l1-q13-a1', text: 'Riforma del 1968', isCorrect: false },
            { id: 'l1-q13-a2', text: 'Riforma del 1978', isCorrect: false },
            { id: 'l1-q13-a3', text: 'Riforma del 1992', isCorrect: true },
            { id: 'l1-q13-a4', text: 'Riforma del 2001', isCorrect: false }
          ]
        },
        {
          id: 'l1-q14',
          lessonId: 1,
          questionNumber: 14,
          text: 'Quale principio costituzionale garantisce l\'accesso alle cure per tutti?',
          answers: [
            { id: 'l1-q14-a1', text: 'Universalità', isCorrect: true },
            { id: 'l1-q14-a2', text: 'Efficienza', isCorrect: false },
            { id: 'l1-q14-a3', text: 'Competitività', isCorrect: false },
            { id: 'l1-q14-a4', text: 'Selettività', isCorrect: false }
          ]
        },
        {
          id: 'l1-q15',
          lessonId: 1,
          questionNumber: 15,
          text: 'Chi finanzia il Servizio Sanitario Nazionale?',
          answers: [
            { id: 'l1-q15-a1', text: 'Fondo Sanitario Nazionale e finanziamenti regionali', isCorrect: true },
            { id: 'l1-q15-a2', text: 'Solo le tasse regionali', isCorrect: false },
            { id: 'l1-q15-a3', text: 'Solo i contributi dei cittadini', isCorrect: false },
            { id: 'l1-q15-a4', text: 'Solo finanziamenti privati', isCorrect: false }
          ]
        },
        {
          id: 'l1-q16',
          lessonId: 1,
          questionNumber: 16,
          text: 'Quale organo è responsabile della definizione dei LEA a livello nazionale?',
          answers: [
            { id: 'l1-q16-a1', text: 'Il Ministero della Salute', isCorrect: true },
            { id: 'l1-q16-a2', text: 'Le Regioni', isCorrect: false },
            { id: 'l1-q16-a3', text: 'Le ASL', isCorrect: false },
            { id: 'l1-q16-a4', text: 'I Comuni', isCorrect: false }
          ]
        },
        {
          id: 'l1-q17',
          lessonId: 1,
          questionNumber: 17,
          text: 'Cosa prevede la legge 833/1978 riguardo all\'assistenza sanitaria?',
          answers: [
            { id: 'l1-q17-a1', text: 'Assistenza universale, globale e continuativa', isCorrect: true },
            { id: 'l1-q17-a2', text: 'Assistenza solo per i lavoratori', isCorrect: false },
            { id: 'l1-q17-a3', text: 'Assistenza a pagamento', isCorrect: false },
            { id: 'l1-q17-a4', text: 'Assistenza solo per gli iscritti', isCorrect: false }
          ]
        },
        {
          id: 'l1-q18',
          lessonId: 1,
          questionNumber: 18,
          text: 'Quale riforma ha introdotto la distinzione tra enti erogatori e enti committenti?',
          answers: [
            { id: 'l1-q18-a1', text: 'Riforma del 1992-1993', isCorrect: true },
            { id: 'l1-q18-a2', text: 'Riforma del 1978', isCorrect: false },
            { id: 'l1-q18-a3', text: 'Riforma del 2001', isCorrect: false },
            { id: 'l1-q18-a4', text: 'Riforma del 2010', isCorrect: false }
          ]
        },
        {
          id: 'l1-q19',
          lessonId: 1,
          questionNumber: 19,
          text: 'Quale documento stabilisce l\'organizzazione del SSN?',
          answers: [
            { id: 'l1-q19-a1', text: 'Il Piano Sanitario Nazionale', isCorrect: true },
            { id: 'l1-q19-a2', text: 'Il Piano Regionale', isCorrect: false },
            { id: 'l1-q19-a3', text: 'Il Piano Aziendale', isCorrect: false },
            { id: 'l1-q19-a4', text: 'Il Piano Comunale', isCorrect: false }
          ]
        },
        {
          id: 'l1-q20',
          lessonId: 1,
          questionNumber: 20,
          text: 'Quale principio garantisce che tutti i cittadini abbiano accesso alle stesse prestazioni essenziali?',
          answers: [
            { id: 'l1-q20-a1', text: 'Equità', isCorrect: true },
            { id: 'l1-q20-a2', text: 'Efficienza', isCorrect: false },
            { id: 'l1-q20-a3', text: 'Competitività', isCorrect: false },
            { id: 'l1-q20-a4', text: 'Profittabilità', isCorrect: false }
          ]
        }
      ]
    });

    // Lesson 2: Operatore Socio-Sanitario - Ruolo e Responsabilità
    this.lessons.push({
      id: 2,
      title: 'Operatore Socio-Sanitario: Ruolo, Responsabilità e Deontologia',
      questions: [
        {
          id: 'l2-q1',
          lessonId: 2,
          questionNumber: 1,
          text: 'Cosa significa OSS?',
          answers: [
            { id: 'l2-q1-a1', text: 'Operatore Socio-Sanitario', isCorrect: true },
            { id: 'l2-q1-a2', text: 'Operatore Sanitario Specializzato', isCorrect: false },
            { id: 'l2-q1-a3', text: 'Operatore Servizi Sociali', isCorrect: false },
            { id: 'l2-q1-a4', text: 'Operatore Sanitario di Supporto', isCorrect: false }
          ]
        },
        {
          id: 'l2-q2',
          lessonId: 2,
          questionNumber: 2,
          text: 'Quale è il principale compito dell\'OSS?',
          answers: [
            { id: 'l2-q2-a1', text: 'Assistenza di base alla persona', isCorrect: true },
            { id: 'l2-q2-a2', text: 'Diagnosi medica', isCorrect: false },
            { id: 'l2-q2-a3', text: 'Prescrizione farmaci', isCorrect: false },
            { id: 'l2-q2-a4', text: 'Interventi chirurgici', isCorrect: false }
          ]
        },
        {
          id: 'l2-q3',
          lessonId: 2,
          questionNumber: 3,
          text: 'L\'OSS può somministrare farmaci?',
          answers: [
            { id: 'l2-q3-a1', text: 'Solo se autorizzato e sotto supervisione', isCorrect: true },
            { id: 'l2-q3-a2', text: 'Sempre, in autonomia', isCorrect: false },
            { id: 'l2-q3-a3', text: 'Mai', isCorrect: false },
            { id: 'l2-q3-a4', text: 'Solo farmaci da banco', isCorrect: false }
          ]
        },
        {
          id: 'l2-q4',
          lessonId: 2,
          questionNumber: 4,
          text: 'Quale principio deontologico è fondamentale per l\'OSS?',
          answers: [
            { id: 'l2-q4-a1', text: 'Rispetto della dignità della persona', isCorrect: true },
            { id: 'l2-q4-a2', text: 'Massimizzazione del profitto', isCorrect: false },
            { id: 'l2-q4-a3', text: 'Velocità nell\'esecuzione', isCorrect: false },
            { id: 'l2-q4-a4', text: 'Competitività', isCorrect: false }
          ]
        },
        {
          id: 'l2-q5',
          lessonId: 2,
          questionNumber: 5,
          text: 'L\'OSS lavora in collaborazione con:',
          answers: [
            { id: 'l2-q5-a1', text: 'Equipe multidisciplinare', isCorrect: true },
            { id: 'l2-q5-a2', text: 'Solo con altri OSS', isCorrect: false },
            { id: 'l2-q5-a3', text: 'In totale autonomia', isCorrect: false },
            { id: 'l2-q5-a4', text: 'Solo con medici', isCorrect: false }
          ]
        },
        {
          id: 'l2-q6',
          lessonId: 2,
          questionNumber: 6,
          text: 'Quale documento definisce il profilo professionale dell\'OSS?',
          answers: [
            { id: 'l2-q6-a1', text: 'Accordo Stato-Regioni', isCorrect: true },
            { id: 'l2-q6-a2', text: 'Legge Regionale', isCorrect: false },
            { id: 'l2-q6-a3', text: 'Circolare Ministeriale', isCorrect: false },
            { id: 'l2-q6-a4', text: 'Decreto Legge', isCorrect: false }
          ]
        },
        {
          id: 'l2-q7',
          lessonId: 2,
          questionNumber: 7,
          text: 'L\'OSS deve mantenere:',
          answers: [
            { id: 'l2-q7-a1', text: 'Riservatezza sui dati del paziente', isCorrect: true },
            { id: 'l2-q7-a2', text: 'Trasparenza totale', isCorrect: false },
            { id: 'l2-q7-a3', text: 'Comunicazione pubblica', isCorrect: false },
            { id: 'l2-q7-a4', text: 'Nessun obbligo di riservatezza', isCorrect: false }
          ]
        },
        {
          id: 'l2-q8',
          lessonId: 2,
          questionNumber: 8,
          text: 'Quale competenza è fondamentale per l\'OSS?',
          answers: [
            { id: 'l2-q8-a1', text: 'Competenze relazionali e comunicative', isCorrect: true },
            { id: 'l2-q8-a2', text: 'Competenze chirurgiche', isCorrect: false },
            { id: 'l2-q8-a3', text: 'Competenze diagnostiche', isCorrect: false },
            { id: 'l2-q8-a4', text: 'Competenze amministrative', isCorrect: false }
          ]
        },
        {
          id: 'l2-q9',
          lessonId: 2,
          questionNumber: 9,
          text: 'L\'OSS può effettuare diagnosi?',
          answers: [
            { id: 'l2-q9-a1', text: 'No, non è di sua competenza', isCorrect: true },
            { id: 'l2-q9-a2', text: 'Sì, sempre', isCorrect: false },
            { id: 'l2-q9-a3', text: 'Solo diagnosi semplici', isCorrect: false },
            { id: 'l2-q9-a4', text: 'Solo se autorizzato', isCorrect: false }
          ]
        },
        {
          id: 'l2-q10',
          lessonId: 2,
          questionNumber: 10,
          text: 'Quale principio guida l\'operato dell\'OSS?',
          answers: [
            { id: 'l2-q10-a1', text: 'Centralità della persona assistita', isCorrect: true },
            { id: 'l2-q10-a2', text: 'Efficienza economica', isCorrect: false },
            { id: 'l2-q10-a3', text: 'Velocità operativa', isCorrect: false },
            { id: 'l2-q10-a4', text: 'Standardizzazione', isCorrect: false }
          ]
        },
        {
          id: 'l2-q11',
          lessonId: 2,
          questionNumber: 11,
          text: 'L\'OSS deve aggiornare continuamente le proprie competenze?',
          answers: [
            { id: 'l2-q11-a1', text: 'Sì, attraverso la formazione continua', isCorrect: true },
            { id: 'l2-q11-a2', text: 'No, la formazione iniziale è sufficiente', isCorrect: false },
            { id: 'l2-q11-a3', text: 'Solo se richiesto', isCorrect: false },
            { id: 'l2-q11-a4', text: 'Solo ogni 5 anni', isCorrect: false }
          ]
        },
        {
          id: 'l2-q12',
          lessonId: 2,
          questionNumber: 12,
          text: 'Quale responsabilità ha l\'OSS?',
          answers: [
            { id: 'l2-q12-a1', text: 'Responsabilità civile, penale e deontologica', isCorrect: true },
            { id: 'l2-q12-a2', text: 'Solo responsabilità civile', isCorrect: false },
            { id: 'l2-q12-a3', text: 'Nessuna responsabilità', isCorrect: false },
            { id: 'l2-q12-a4', text: 'Solo responsabilità amministrativa', isCorrect: false }
          ]
        },
        {
          id: 'l2-q13',
          lessonId: 2,
          questionNumber: 13,
          text: 'L\'OSS può rifiutare un incarico?',
          answers: [
            { id: 'l2-q13-a1', text: 'Solo se non di sua competenza o pericoloso', isCorrect: true },
            { id: 'l2-q13-a2', text: 'Mai', isCorrect: false },
            { id: 'l2-q13-a3', text: 'Sempre, a sua discrezione', isCorrect: false },
            { id: 'l2-q13-a4', text: 'Solo se autorizzato', isCorrect: false }
          ]
        },
        {
          id: 'l2-q14',
          lessonId: 2,
          questionNumber: 14,
          text: 'Quale documento deve rispettare l\'OSS nel suo operato?',
          answers: [
            { id: 'l2-q14-a1', text: 'Codice Deontologico', isCorrect: true },
            { id: 'l2-q14-a2', text: 'Codice Civile', isCorrect: false },
            { id: 'l2-q14-a3', text: 'Codice Penale', isCorrect: false },
            { id: 'l2-q14-a4', text: 'Nessun codice specifico', isCorrect: false }
          ]
        },
        {
          id: 'l2-q15',
          lessonId: 2,
          questionNumber: 15,
          text: 'L\'OSS deve documentare le proprie attività?',
          answers: [
            { id: 'l2-q15-a1', text: 'Sì, sempre', isCorrect: true },
            { id: 'l2-q15-a2', text: 'No, non necessario', isCorrect: false },
            { id: 'l2-q15-a3', text: 'Solo se richiesto', isCorrect: false },
            { id: 'l2-q15-a4', text: 'Solo attività complesse', isCorrect: false }
          ]
        },
        {
          id: 'l2-q16',
          lessonId: 2,
          questionNumber: 16,
          text: 'Quale atteggiamento deve avere l\'OSS verso il paziente?',
          answers: [
            { id: 'l2-q16-a1', text: 'Empatico, rispettoso e professionale', isCorrect: true },
            { id: 'l2-q16-a2', text: 'Distaccato e formale', isCorrect: false },
            { id: 'l2-q16-a3', text: 'Amichevole e confidenziale', isCorrect: false },
            { id: 'l2-q16-a4', text: 'Autoritario', isCorrect: false }
          ]
        },
        {
          id: 'l2-q17',
          lessonId: 2,
          questionNumber: 17,
          text: 'L\'OSS può lavorare in strutture:',
          answers: [
            { id: 'l2-q17-a1', text: 'Ospedali, RSA, assistenza domiciliare', isCorrect: true },
            { id: 'l2-q17-a2', text: 'Solo in ospedali', isCorrect: false },
            { id: 'l2-q17-a3', text: 'Solo in RSA', isCorrect: false },
            { id: 'l2-q17-a4', text: 'Solo in ambulatori', isCorrect: false }
          ]
        },
        {
          id: 'l2-q18',
          lessonId: 2,
          questionNumber: 18,
          text: 'Quale principio etico guida l\'OSS?',
          answers: [
            { id: 'l2-q18-a1', text: 'Non nuocere (primum non nocere)', isCorrect: true },
            { id: 'l2-q18-a2', text: 'Massimizzare il profitto', isCorrect: false },
            { id: 'l2-q18-a3', text: 'Velocità operativa', isCorrect: false },
            { id: 'l2-q18-a4', text: 'Efficienza economica', isCorrect: false }
          ]
        },
        {
          id: 'l2-q19',
          lessonId: 2,
          questionNumber: 19,
          text: 'L\'OSS deve rispettare:',
          answers: [
            { id: 'l2-q19-a1', text: 'I diritti del paziente', isCorrect: true },
            { id: 'l2-q19-a2', text: 'Solo le direttive del medico', isCorrect: false },
            { id: 'l2-q19-a3', text: 'Solo le procedure aziendali', isCorrect: false },
            { id: 'l2-q19-a4', text: 'Nessun diritto specifico', isCorrect: false }
          ]
        },
        {
          id: 'l2-q20',
          lessonId: 2,
          questionNumber: 20,
          text: 'Quale competenza tecnica è essenziale per l\'OSS?',
          answers: [
            { id: 'l2-q20-a1', text: 'Tecniche di assistenza di base', isCorrect: true },
            { id: 'l2-q20-a2', text: 'Tecniche chirurgiche', isCorrect: false },
            { id: 'l2-q20-a3', text: 'Tecniche diagnostiche', isCorrect: false },
            { id: 'l2-q20-a4', text: 'Tecniche amministrative', isCorrect: false }
          ]
        }
      ]
    });

    // Continue with more lessons
    this.createRemainingLessons();

    // Initialize progress for all lessons
    this.lessons.forEach(lesson => {
      const progress: LessonProgress = {
        lessonId: lesson.id,
        questionStates: new Map()
      };
      this.lessonProgressMap.set(lesson.id, progress);
    });
  }

  private createRemainingLessons(): void {
    // Lesson 3: Sicurezza sul Lavoro (Decreto 81/08)
    this.lessons.push({
      id: 3,
      title: 'Sicurezza sul Lavoro - Decreto 81/08',
      questions: this.createSafetyQuestions()
    });

    // Lesson 4: Comunicazione in Sanità
    this.lessons.push({
      id: 4,
      title: 'Comunicazione in Sanità e Relazioni',
      questions: this.createCommunicationQuestions()
    });

    // Lesson 5: Anatomia e Fisiologia - Sistema Nervoso
    this.lessons.push({
      id: 5,
      title: 'Anatomia e Fisiologia: Sistema Nervoso',
      questions: this.createNervousSystemQuestions()
    });

    // Lesson 6: Anatomia e Fisiologia - Sistema Cardiocircolatorio
    this.lessons.push({
      id: 6,
      title: 'Anatomia e Fisiologia: Sistema Cardiocircolatorio',
      questions: this.createCardiovascularQuestions()
    });

    // Lesson 7: Anatomia e Fisiologia - Apparato Respiratorio
    this.lessons.push({
      id: 7,
      title: 'Anatomia e Fisiologia: Apparato Respiratorio',
      questions: this.createRespiratoryQuestions()
    });

    // Lesson 8: Anatomia e Fisiologia - Apparato Digerente
    this.lessons.push({
      id: 8,
      title: 'Anatomia e Fisiologia: Apparato Digerente',
      questions: this.createDigestiveQuestions()
    });

    // Lesson 9: Anatomia e Fisiologia - Apparato Genito-Urinario
    this.lessons.push({
      id: 9,
      title: 'Anatomia e Fisiologia: Apparato Genito-Urinario',
      questions: this.createGenitourinaryQuestions()
    });

    // Lesson 10: Anatomia e Fisiologia - Sistema Endocrino
    this.lessons.push({
      id: 10,
      title: 'Anatomia e Fisiologia: Sistema Endocrino',
      questions: this.createEndocrineQuestions()
    });

    // Lesson 11: Anatomia e Fisiologia - Sistema Muscolo-Scheletrico
    this.lessons.push({
      id: 11,
      title: 'Anatomia e Fisiologia: Sistema Muscolo-Scheletrico',
      questions: this.createMusculoskeletalQuestions()
    });

    // Lesson 12: Parametri Vitali
    this.lessons.push({
      id: 12,
      title: 'Parametri Vitali',
      questions: this.createVitalSignsQuestions()
    });

    // Lesson 13: Terapia Farmacologica
    this.lessons.push({
      id: 13,
      title: 'Terapia Farmacologica',
      questions: this.createPharmacologyQuestions()
    });

    // Lesson 14: Nutrizione e Assistenza Alimentare
    this.lessons.push({
      id: 14,
      title: 'Nutrizione e Assistenza Alimentare',
      questions: this.createNutritionQuestions()
    });

    // Lesson 15: Primo Soccorso e Emergenze
    this.lessons.push({
      id: 15,
      title: 'Primo Soccorso e Risposta all\'Emergenza',
      questions: this.createFirstAidQuestions()
    });

    // Lesson 16: Igiene e Prevenzione
    this.lessons.push({
      id: 16,
      title: 'Igiene, Prevenzione e Sicurezza Clinica',
      questions: this.createHygieneQuestions()
    });

    // Lesson 17: Assistenza di Base
    this.lessons.push({
      id: 17,
      title: 'Assistenza di Base e Comfort del Paziente',
      questions: this.createBasicCareQuestions()
    });

    // Lesson 18: Paziente Chirurgico
    this.lessons.push({
      id: 18,
      title: 'Gestione del Paziente Chirurgico',
      questions: this.createSurgicalPatientQuestions()
    });

    // Lesson 19: Assistenza all'Anziano
    this.lessons.push({
      id: 19,
      title: 'Assistenza all\'Anziano',
      questions: this.createElderlyCareQuestions()
    });

    // Lesson 20: Assistenza Pediatrica
    this.lessons.push({
      id: 20,
      title: 'Assistenza al Paziente Pediatrico',
      questions: this.createPediatricQuestions()
    });

    // Lesson 21: Assistenza Oncologica e Terminale
    this.lessons.push({
      id: 21,
      title: 'Assistenza al Paziente Oncologico e Terminale',
      questions: this.createOncologicalQuestions()
    });

    // Lesson 22: Disabilità e Salute Mentale
    this.lessons.push({
      id: 22,
      title: 'Disabilità e Salute Mentale',
      questions: this.createDisabilityQuestions()
    });

    // Lesson 23: Terapia Intensiva
    this.lessons.push({
      id: 23,
      title: 'Terapia Intensiva: Supporto e Competenze OSS',
      questions: this.createIntensiveCareQuestions()
    });

    // Lesson 24: Gestione Rifiuti e Sterilizzazione
    this.lessons.push({
      id: 24,
      title: 'Gestione Rifiuti e Sterilizzazione',
      questions: this.createWasteManagementQuestions()
    });

    // Lesson 25: Psicologia e Dinamiche di Gruppo
    this.lessons.push({
      id: 25,
      title: 'Psicologia e Dinamiche di Gruppo',
      questions: this.createPsychologyQuestions()
    });
  }

  // Helper methods to create questions for each topic
  private createSafetyQuestions(): Question[] {
    return [
      {
        id: 'l3-q1',
        lessonId: 3,
        questionNumber: 1,
        text: 'Quale decreto regola la sicurezza sul lavoro in Italia?',
        answers: [
          { id: 'l3-q1-a1', text: 'Decreto Legislativo 81/2008', isCorrect: true },
          { id: 'l3-q1-a2', text: 'Decreto Legislativo 196/2003', isCorrect: false },
          { id: 'l3-q1-a3', text: 'Decreto Legislativo 104/1992', isCorrect: false },
          { id: 'l3-q1-a4', text: 'Decreto Legislativo 833/1978', isCorrect: false }
        ]
      },
      {
        id: 'l3-q2',
        lessonId: 3,
        questionNumber: 2,
        text: 'Chi è responsabile della sicurezza sul lavoro?',
        answers: [
          { id: 'l3-q2-a1', text: 'Datore di lavoro, dirigenti, preposti e lavoratori', isCorrect: true },
          { id: 'l3-q2-a2', text: 'Solo il datore di lavoro', isCorrect: false },
          { id: 'l3-q2-a3', text: 'Solo i lavoratori', isCorrect: false },
          { id: 'l3-q2-a4', text: 'Solo il RSPP', isCorrect: false }
        ]
      },
      {
        id: 'l3-q3',
        lessonId: 3,
        questionNumber: 3,
        text: 'Cosa significa DPI?',
        answers: [
          { id: 'l3-q3-a1', text: 'Dispositivo di Protezione Individuale', isCorrect: true },
          { id: 'l3-q3-a2', text: 'Dispositivo di Prevenzione Individuale', isCorrect: false },
          { id: 'l3-q3-a3', text: 'Dispositivo di Protezione Integrata', isCorrect: false },
          { id: 'l3-q3-a4', text: 'Dispositivo di Prevenzione Integrata', isCorrect: false }
        ]
      },
      {
        id: 'l3-q4',
        lessonId: 3,
        questionNumber: 4,
        text: 'Cosa significa RSPP?',
        answers: [
          { id: 'l3-q4-a1', text: 'Responsabile del Servizio di Prevenzione e Protezione', isCorrect: true },
          { id: 'l3-q4-a2', text: 'Responsabile della Sicurezza e Prevenzione Professionale', isCorrect: false },
          { id: 'l3-q4-a3', text: 'Responsabile del Servizio di Protezione Professionale', isCorrect: false },
          { id: 'l3-q4-a4', text: 'Responsabile della Sicurezza e Prevenzione Personale', isCorrect: false }
        ]
      },
      {
        id: 'l3-q5',
        lessonId: 3,
        questionNumber: 5,
        text: 'Cosa significa DVR?',
        answers: [
          { id: 'l3-q5-a1', text: 'Documento di Valutazione dei Rischi', isCorrect: true },
          { id: 'l3-q5-a2', text: 'Documento di Valutazione e Rischio', isCorrect: false },
          { id: 'l3-q5-a3', text: 'Documento di Verifica dei Rischi', isCorrect: false },
          { id: 'l3-q5-a4', text: 'Documento di Valutazione e Responsabilità', isCorrect: false }
        ]
      },
      {
        id: 'l3-q6',
        lessonId: 3,
        questionNumber: 6,
        text: 'Quale DPI è fondamentale per l\'OSS?',
        answers: [
          { id: 'l3-q6-a1', text: 'Guanti, mascherine, camici', isCorrect: true },
          { id: 'l3-q6-a2', text: 'Casco e scarpe antinfortunistiche', isCorrect: false },
          { id: 'l3-q6-a3', text: 'Occhiali di sicurezza', isCorrect: false },
          { id: 'l3-q6-a4', text: 'Cuffie antirumore', isCorrect: false }
        ]
      },
      {
        id: 'l3-q7',
        lessonId: 3,
        questionNumber: 7,
        text: 'Cosa prevede il D.Lgs. 81/08 per la movimentazione manuale dei carichi?',
        answers: [
          { id: 'l3-q7-a1', text: 'Formazione, uso di tecniche corrette, ausili meccanici', isCorrect: true },
          { id: 'l3-q7-a2', text: 'Nessuna regola specifica', isCorrect: false },
          { id: 'l3-q7-a3', text: 'Solo uso di ausili meccanici', isCorrect: false },
          { id: 'l3-q7-a4', text: 'Solo formazione teorica', isCorrect: false }
        ]
      },
      {
        id: 'l3-q8',
        lessonId: 3,
        questionNumber: 8,
        text: 'Quale è il peso massimo consigliato per la movimentazione manuale?',
        answers: [
          { id: 'l3-q8-a1', text: '25 kg per uomini, 20 kg per donne', isCorrect: true },
          { id: 'l3-q8-a2', text: '30 kg per tutti', isCorrect: false },
          { id: 'l3-q8-a3', text: '20 kg per tutti', isCorrect: false },
          { id: 'l3-q8-a4', text: '15 kg per tutti', isCorrect: false }
        ]
      },
      {
        id: 'l3-q9',
        lessonId: 3,
        questionNumber: 9,
        text: 'Cosa significa BLSD?',
        answers: [
          { id: 'l3-q9-a1', text: 'Basic Life Support and Defibrillation', isCorrect: true },
          { id: 'l3-q9-a2', text: 'Basic Life Support and Diagnosis', isCorrect: false },
          { id: 'l3-q9-a3', text: 'Basic Life Support and Disinfection', isCorrect: false },
          { id: 'l3-q9-a4', text: 'Basic Life Support and Documentation', isCorrect: false }
        ]
      },
      {
        id: 'l3-q10',
        lessonId: 3,
        questionNumber: 10,
        text: 'Quale è la procedura corretta in caso di incendio?',
        answers: [
          { id: 'l3-q10-a1', text: 'Allertare, evacuare, spegnere se possibile', isCorrect: true },
          { id: 'l3-q10-a2', text: 'Spegnere immediatamente', isCorrect: false },
          { id: 'l3-q10-a3', text: 'Fuggire immediatamente', isCorrect: false },
          { id: 'l3-q10-a4', text: 'Aspettare i soccorsi', isCorrect: false }
        ]
      },
      {
        id: 'l3-q11',
        lessonId: 3,
        questionNumber: 11,
        text: 'Cosa significa RLS?',
        answers: [
          { id: 'l3-q11-a1', text: 'Rappresentante dei Lavoratori per la Sicurezza', isCorrect: true },
          { id: 'l3-q11-a2', text: 'Responsabile della Sicurezza Lavorativa', isCorrect: false },
          { id: 'l3-q11-a3', text: 'Responsabile del Servizio Lavorativo', isCorrect: false },
          { id: 'l3-q11-a4', text: 'Rappresentante della Sicurezza Lavorativa', isCorrect: false }
        ]
      },
      {
        id: 'l3-q12',
        lessonId: 3,
        questionNumber: 12,
        text: 'Quale è la posizione corretta per sollevare un carico?',
        answers: [
          { id: 'l3-q12-a1', text: 'Gambe piegate, schiena dritta, carico vicino al corpo', isCorrect: true },
          { id: 'l3-q12-a2', text: 'Gambe dritte, schiena piegata', isCorrect: false },
          { id: 'l3-q12-a3', text: 'Schiena piegata, braccia tese', isCorrect: false },
          { id: 'l3-q12-a4', text: 'Qualsiasi posizione comoda', isCorrect: false }
        ]
      },
      {
        id: 'l3-q13',
        lessonId: 3,
        questionNumber: 13,
        text: 'Quale rischio è più frequente per l\'OSS?',
        answers: [
          { id: 'l3-q13-a1', text: 'Rischio biologico, ergonomico, chimico', isCorrect: true },
          { id: 'l3-q13-a2', text: 'Rischio meccanico', isCorrect: false },
          { id: 'l3-q13-a3', text: 'Rischio elettrico', isCorrect: false },
          { id: 'l3-q13-a4', text: 'Rischio acustico', isCorrect: false }
        ]
      },
      {
        id: 'l3-q14',
        lessonId: 3,
        questionNumber: 14,
        text: 'Cosa prevede la valutazione dei rischi?',
        answers: [
          { id: 'l3-q14-a1', text: 'Identificazione, analisi e misure di prevenzione', isCorrect: true },
          { id: 'l3-q14-a2', text: 'Solo identificazione', isCorrect: false },
          { id: 'l3-q14-a3', text: 'Solo misure di prevenzione', isCorrect: false },
          { id: 'l3-q14-a4', text: 'Nessuna procedura specifica', isCorrect: false }
        ]
      },
      {
        id: 'l3-q15',
        lessonId: 3,
        questionNumber: 15,
        text: 'Quale formazione è obbligatoria per l\'OSS?',
        answers: [
          { id: 'l3-q15-a1', text: 'Formazione generale e specifica sulla sicurezza', isCorrect: true },
          { id: 'l3-q15-a2', text: 'Solo formazione generale', isCorrect: false },
          { id: 'l3-q15-a3', text: 'Solo formazione specifica', isCorrect: false },
          { id: 'l3-q15-a4', text: 'Nessuna formazione obbligatoria', isCorrect: false }
        ]
      },
      {
        id: 'l3-q16',
        lessonId: 3,
        questionNumber: 16,
        text: 'Cosa significa emergenza sanitaria?',
        answers: [
          { id: 'l3-q16-a1', text: 'Situazione che richiede intervento immediato', isCorrect: true },
          { id: 'l3-q16-a2', text: 'Qualsiasi situazione sanitaria', isCorrect: false },
          { id: 'l3-q16-a3', text: 'Solo situazioni gravi', isCorrect: false },
          { id: 'l3-q16-a4', text: 'Situazioni programmate', isCorrect: false }
        ]
      },
      {
        id: 'l3-q17',
        lessonId: 3,
        questionNumber: 17,
        text: 'Quale è il numero di emergenza sanitario in Italia?',
        answers: [
          { id: 'l3-q17-a1', text: '118', isCorrect: true },
          { id: 'l3-q17-a2', text: '112', isCorrect: false },
          { id: 'l3-q17-a3', text: '115', isCorrect: false },
          { id: 'l3-q17-a4', text: '113', isCorrect: false }
        ]
      },
      {
        id: 'l3-q18',
        lessonId: 3,
        questionNumber: 18,
        text: 'Cosa significa triage?',
        answers: [
          { id: 'l3-q18-a1', text: 'Valutazione prioritaria dei pazienti', isCorrect: true },
          { id: 'l3-q18-a2', text: 'Trattamento immediato', isCorrect: false },
          { id: 'l3-q18-a3', text: 'Diagnosi medica', isCorrect: false },
          { id: 'l3-q18-a4', text: 'Terapia farmacologica', isCorrect: false }
        ]
      },
      {
        id: 'l3-q19',
        lessonId: 3,
        questionNumber: 19,
        text: 'Quale classe di fuoco è rappresentata da materiali solidi?',
        answers: [
          { id: 'l3-q19-a1', text: 'Classe A', isCorrect: true },
          { id: 'l3-q19-a2', text: 'Classe B', isCorrect: false },
          { id: 'l3-q19-a3', text: 'Classe C', isCorrect: false },
          { id: 'l3-q19-a4', text: 'Classe D', isCorrect: false }
        ]
      },
      {
        id: 'l3-q20',
        lessonId: 3,
        questionNumber: 20,
        text: 'Quale estintore si usa per fuochi di classe A?',
        answers: [
          { id: 'l3-q20-a1', text: 'Estintore ad acqua o schiuma', isCorrect: true },
          { id: 'l3-q20-a2', text: 'Estintore a polvere', isCorrect: false },
          { id: 'l3-q20-a3', text: 'Estintore a CO2', isCorrect: false },
          { id: 'l3-q20-a4', text: 'Estintore a idrocarburi', isCorrect: false }
        ]
      }
    ];
  }

  private createCommunicationQuestions(): Question[] {
    return [
      {
        id: 'l4-q1',
        lessonId: 4,
        questionNumber: 1,
        text: 'Quale è l\'elemento fondamentale della comunicazione efficace?',
        answers: [
          { id: 'l4-q1-a1', text: 'Ascolto attivo ed empatia', isCorrect: true },
          { id: 'l4-q1-a2', text: 'Velocità nella comunicazione', isCorrect: false },
          { id: 'l4-q1-a3', text: 'Uso di termini tecnici', isCorrect: false },
          { id: 'l4-q1-a4', text: 'Comunicazione unidirezionale', isCorrect: false }
        ]
      },
      {
        id: 'l4-q2',
        lessonId: 4,
        questionNumber: 2,
        text: 'Cosa significa comunicazione non verbale?',
        answers: [
          { id: 'l4-q2-a1', text: 'Comunicazione attraverso gesti, postura, espressioni', isCorrect: true },
          { id: 'l4-q2-a2', text: 'Comunicazione scritta', isCorrect: false },
          { id: 'l4-q2-a3', text: 'Comunicazione telefonica', isCorrect: false },
          { id: 'l4-q2-a4', text: 'Comunicazione verbale', isCorrect: false }
        ]
      },
      {
        id: 'l4-q3',
        lessonId: 4,
        questionNumber: 3,
        text: 'Quale atteggiamento favorisce la comunicazione con il paziente?',
        answers: [
          { id: 'l4-q3-a1', text: 'Rispetto, pazienza, chiarezza', isCorrect: true },
          { id: 'l4-q3-a2', text: 'Autorità e distacco', isCorrect: false },
          { id: 'l4-q3-a3', text: 'Familiarità eccessiva', isCorrect: false },
          { id: 'l4-q3-a4', text: 'Comunicazione frettolosa', isCorrect: false }
        ]
      },
      {
        id: 'l4-q4',
        lessonId: 4,
        questionNumber: 4,
        text: 'Cosa significa empatia?',
        answers: [
          { id: 'l4-q4-a1', text: 'Capacità di comprendere le emozioni dell\'altro', isCorrect: true },
          { id: 'l4-q4-a2', text: 'Provare le stesse emozioni', isCorrect: false },
          { id: 'l4-q4-a3', text: 'Simpatia verso l\'altro', isCorrect: false },
          { id: 'l4-q4-a4', text: 'Distanza emotiva', isCorrect: false }
        ]
      },
      {
        id: 'l4-q5',
        lessonId: 4,
        questionNumber: 5,
        text: 'Quale barriera può ostacolare la comunicazione?',
        answers: [
          { id: 'l4-q5-a1', text: 'Linguaggio tecnico, pregiudizi, distrazione', isCorrect: true },
          { id: 'l4-q5-a2', text: 'Solo linguaggio tecnico', isCorrect: false },
          { id: 'l4-q5-a3', text: 'Solo pregiudizi', isCorrect: false },
          { id: 'l4-q5-a4', text: 'Nessuna barriera', isCorrect: false }
        ]
      },
      {
        id: 'l4-q6',
        lessonId: 4,
        questionNumber: 6,
        text: 'Come si comunica con un paziente non udente?',
        answers: [
          { id: 'l4-q6-a1', text: 'Linguaggio dei segni, scrittura, gesti', isCorrect: true },
          { id: 'l4-q6-a2', text: 'Solo parlando più forte', isCorrect: false },
          { id: 'l4-q6-a3', text: 'Solo gesti', isCorrect: false },
          { id: 'l4-q6-a4', text: 'Non è possibile comunicare', isCorrect: false }
        ]
      },
      {
        id: 'l4-q7',
        lessonId: 4,
        questionNumber: 7,
        text: 'Quale è l\'importanza della comunicazione nell\'assistenza?',
        answers: [
          { id: 'l4-q7-a1', text: 'Fondamentale per la relazione terapeutica', isCorrect: true },
          { id: 'l4-q7-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l4-q7-a3', text: 'Solo informativa', isCorrect: false },
          { id: 'l4-q7-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l4-q8',
        lessonId: 4,
        questionNumber: 8,
        text: 'Cosa significa ascolto attivo?',
        answers: [
          { id: 'l4-q8-a1', text: 'Ascoltare con attenzione e comprensione', isCorrect: true },
          { id: 'l4-q8-a2', text: 'Ascoltare senza rispondere', isCorrect: false },
          { id: 'l4-q8-a3', text: 'Ascoltare distrattamente', isCorrect: false },
          { id: 'l4-q8-a4', text: 'Ascoltare solo le informazioni importanti', isCorrect: false }
        ]
      },
      {
        id: 'l4-q9',
        lessonId: 4,
        questionNumber: 9,
        text: 'Come si comunica con un paziente confuso?',
        answers: [
          { id: 'l4-q9-a1', text: 'Con calma, semplicità, rassicurazione', isCorrect: true },
          { id: 'l4-q9-a2', text: 'Con tono autoritario', isCorrect: false },
          { id: 'l4-q9-a3', text: 'Con informazioni complesse', isCorrect: false },
          { id: 'l4-q9-a4', text: 'Evitando la comunicazione', isCorrect: false }
        ]
      },
      {
        id: 'l4-q10',
        lessonId: 4,
        questionNumber: 10,
        text: 'Quale elemento è importante nella comunicazione con i familiari?',
        answers: [
          { id: 'l4-q10-a1', text: 'Trasparenza, rispetto, coinvolgimento', isCorrect: true },
          { id: 'l4-q10-a2', text: 'Riservatezza totale', isCorrect: false },
          { id: 'l4-q10-a3', text: 'Comunicazione solo positiva', isCorrect: false },
          { id: 'l4-q10-a4', text: 'Evitare la comunicazione', isCorrect: false }
        ]
      },
      {
        id: 'l4-q11',
        lessonId: 4,
        questionNumber: 11,
        text: 'Cosa significa comunicazione assertiva?',
        answers: [
          { id: 'l4-q11-a1', text: 'Comunicazione chiara, rispettosa e diretta', isCorrect: true },
          { id: 'l4-q11-a2', text: 'Comunicazione aggressiva', isCorrect: false },
          { id: 'l4-q11-a3', text: 'Comunicazione passiva', isCorrect: false },
          { id: 'l4-q11-a4', text: 'Comunicazione evasiva', isCorrect: false }
        ]
      },
      {
        id: 'l4-q12',
        lessonId: 4,
        questionNumber: 12,
        text: 'Quale è l\'importanza del feedback nella comunicazione?',
        answers: [
          { id: 'l4-q12-a1', text: 'Verifica della comprensione', isCorrect: true },
          { id: 'l4-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l4-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l4-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l4-q13',
        lessonId: 4,
        questionNumber: 13,
        text: 'Come si gestisce la comunicazione in situazioni di stress?',
        answers: [
          { id: 'l4-q13-a1', text: 'Mantenendo calma, chiarezza e professionalità', isCorrect: true },
          { id: 'l4-q13-a2', text: 'Comunicando velocemente', isCorrect: false },
          { id: 'l4-q13-a3', text: 'Evitando la comunicazione', isCorrect: false },
          { id: 'l4-q13-a4', text: 'Comunicando in modo emotivo', isCorrect: false }
        ]
      },
      {
        id: 'l4-q14',
        lessonId: 4,
        questionNumber: 14,
        text: 'Quale è l\'importanza della comunicazione nell\'equipe?',
        answers: [
          { id: 'l4-q14-a1', text: 'Fondamentale per la continuità assistenziale', isCorrect: true },
          { id: 'l4-q14-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l4-q14-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l4-q14-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l4-q15',
        lessonId: 4,
        questionNumber: 15,
        text: 'Come si comunica una cattiva notizia?',
        answers: [
          { id: 'l4-q15-a1', text: 'Con empatia, gradualmente, in ambiente adatto', isCorrect: true },
          { id: 'l4-q15-a2', text: 'Direttamente e velocemente', isCorrect: false },
          { id: 'l4-q15-a3', text: 'Evitando di comunicarla', isCorrect: false },
          { id: 'l4-q15-a4', text: 'Solo per iscritto', isCorrect: false }
        ]
      },
      {
        id: 'l4-q16',
        lessonId: 4,
        questionNumber: 16,
        text: 'Quale è l\'importanza del contatto visivo nella comunicazione?',
        answers: [
          { id: 'l4-q16-a1', text: 'Favorisce la fiducia e la comprensione', isCorrect: true },
          { id: 'l4-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l4-q16-a3', text: 'Può essere invasivo', isCorrect: false },
          { id: 'l4-q16-a4', text: 'Non necessario', isCorrect: false }
        ]
      },
      {
        id: 'l4-q17',
        lessonId: 4,
        questionNumber: 17,
        text: 'Come si adatta la comunicazione a pazienti di culture diverse?',
        answers: [
          { id: 'l4-q17-a1', text: 'Rispettando usanze, usando mediatori culturali', isCorrect: true },
          { id: 'l4-q17-a2', text: 'Usando solo la lingua italiana', isCorrect: false },
          { id: 'l4-q17-a3', text: 'Ignorando le differenze culturali', isCorrect: false },
          { id: 'l4-q17-a4', text: 'Comunicando solo per iscritto', isCorrect: false }
        ]
      },
      {
        id: 'l4-q18',
        lessonId: 4,
        questionNumber: 18,
        text: 'Quale tecnica di comunicazione è utile con pazienti ansiosi?',
        answers: [
          { id: 'l4-q18-a1', text: 'Rassicurazione, ascolto, informazioni chiare', isCorrect: true },
          { id: 'l4-q18-a2', text: 'Minimizzare le preoccupazioni', isCorrect: false },
          { id: 'l4-q18-a3', text: 'Evitare la comunicazione', isCorrect: false },
          { id: 'l4-q18-a4', text: 'Comunicazione frettolosa', isCorrect: false }
        ]
      },
      {
        id: 'l4-q19',
        lessonId: 4,
        questionNumber: 19,
        text: 'Cosa significa comunicazione terapeutica?',
        answers: [
          { id: 'l4-q19-a1', text: 'Comunicazione finalizzata al benessere del paziente', isCorrect: true },
          { id: 'l4-q19-a2', text: 'Comunicazione medica', isCorrect: false },
          { id: 'l4-q19-a3', text: 'Comunicazione formale', isCorrect: false },
          { id: 'l4-q19-a4', text: 'Comunicazione scritta', isCorrect: false }
        ]
      },
      {
        id: 'l4-q20',
        lessonId: 4,
        questionNumber: 20,
        text: 'Quale è l\'importanza della comunicazione non verbale?',
        answers: [
          { id: 'l4-q20-a1', text: 'Rappresenta il 70% della comunicazione', isCorrect: true },
          { id: 'l4-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l4-q20-a3', text: 'Solo decorativa', isCorrect: false },
          { id: 'l4-q20-a4', text: 'Non rilevante', isCorrect: false }
        ]
      }
    ];
  }

  private createNervousSystemQuestions(): Question[] {
    return [
      {
        id: 'l5-q1',
        lessonId: 5,
        questionNumber: 1,
        text: 'Quale è la funzione principale del sistema nervoso?',
        answers: [
          { id: 'l5-q1-a1', text: 'Coordinare e controllare tutte le funzioni dell\'organismo', isCorrect: true },
          { id: 'l5-q1-a2', text: 'Solo controllare i movimenti', isCorrect: false },
          { id: 'l5-q1-a3', text: 'Solo regolare la respirazione', isCorrect: false },
          { id: 'l5-q1-a4', text: 'Solo controllare la digestione', isCorrect: false }
        ]
      },
      {
        id: 'l5-q2',
        lessonId: 5,
        questionNumber: 2,
        text: 'Quali sono le parti principali del sistema nervoso centrale?',
        answers: [
          { id: 'l5-q2-a1', text: 'Encefalo e midollo spinale', isCorrect: true },
          { id: 'l5-q2-a2', text: 'Cervello e nervi', isCorrect: false },
          { id: 'l5-q2-a3', text: 'Neuroni e sinapsi', isCorrect: false },
          { id: 'l5-q2-a4', text: 'Sistema simpatico e parasimpatico', isCorrect: false }
        ]
      },
      {
        id: 'l5-q3',
        lessonId: 5,
        questionNumber: 3,
        text: 'Cosa sono i neuroni?',
        answers: [
          { id: 'l5-q3-a1', text: 'Cellule specializzate nella trasmissione degli impulsi nervosi', isCorrect: true },
          { id: 'l5-q3-a2', text: 'Vasi sanguigni del sistema nervoso', isCorrect: false },
          { id: 'l5-q3-a3', text: 'Ormoni del sistema nervoso', isCorrect: false },
          { id: 'l5-q3-a4', text: 'Enzimi del sistema nervoso', isCorrect: false }
        ]
      },
      {
        id: 'l5-q4',
        lessonId: 5,
        questionNumber: 4,
        text: 'Quale parte del cervello controlla le funzioni vitali?',
        answers: [
          { id: 'l5-q4-a1', text: 'Tronco encefalico', isCorrect: true },
          { id: 'l5-q4-a2', text: 'Cervelletto', isCorrect: false },
          { id: 'l5-q4-a3', text: 'Corteccia cerebrale', isCorrect: false },
          { id: 'l5-q4-a4', text: 'Ipotalamo', isCorrect: false }
        ]
      },
      {
        id: 'l5-q5',
        lessonId: 5,
        questionNumber: 5,
        text: 'Cosa controlla il cervelletto?',
        answers: [
          { id: 'l5-q5-a1', text: 'Equilibrio e coordinazione dei movimenti', isCorrect: true },
          { id: 'l5-q5-a2', text: 'Respirazione e battito cardiaco', isCorrect: false },
          { id: 'l5-q5-a3', text: 'Pensiero e memoria', isCorrect: false },
          { id: 'l5-q5-a4', text: 'Temperatura corporea', isCorrect: false }
        ]
      },
      {
        id: 'l5-q6',
        lessonId: 5,
        questionNumber: 6,
        text: 'Quale è la funzione del sistema nervoso periferico?',
        answers: [
          { id: 'l5-q6-a1', text: 'Collegare il sistema nervoso centrale con il resto del corpo', isCorrect: true },
          { id: 'l5-q6-a2', text: 'Controllare solo i muscoli', isCorrect: false },
          { id: 'l5-q6-a3', text: 'Regolare solo gli organi interni', isCorrect: false },
          { id: 'l5-q6-a4', text: 'Solo trasmettere il dolore', isCorrect: false }
        ]
      },
      {
        id: 'l5-q7',
        lessonId: 5,
        questionNumber: 7,
        text: 'Cosa significa sinapsi?',
        answers: [
          { id: 'l5-q7-a1', text: 'Punto di contatto tra due neuroni', isCorrect: true },
          { id: 'l5-q7-a2', text: 'Tipo di neurone', isCorrect: false },
          { id: 'l5-q7-a3', text: 'Parte del cervello', isCorrect: false },
          { id: 'l5-q7-a4', text: 'Nervo periferico', isCorrect: false }
        ]
      },
      {
        id: 'l5-q8',
        lessonId: 5,
        questionNumber: 8,
        text: 'Quale parte del cervello è responsabile del pensiero e della memoria?',
        answers: [
          { id: 'l5-q8-a1', text: 'Corteccia cerebrale', isCorrect: true },
          { id: 'l5-q8-a2', text: 'Cervelletto', isCorrect: false },
          { id: 'l5-q8-a3', text: 'Tronco encefalico', isCorrect: false },
          { id: 'l5-q8-a4', text: 'Midollo spinale', isCorrect: false }
        ]
      },
      {
        id: 'l5-q9',
        lessonId: 5,
        questionNumber: 9,
        text: 'Cosa controlla il sistema nervoso autonomo?',
        answers: [
          { id: 'l5-q9-a1', text: 'Funzioni involontarie degli organi interni', isCorrect: true },
          { id: 'l5-q9-a2', text: 'Movimenti volontari', isCorrect: false },
          { id: 'l5-q9-a3', text: 'Solo la respirazione', isCorrect: false },
          { id: 'l5-q9-a4', text: 'Solo la digestione', isCorrect: false }
        ]
      },
      {
        id: 'l5-q10',
        lessonId: 5,
        questionNumber: 10,
        text: 'Quali sono le divisioni del sistema nervoso autonomo?',
        answers: [
          { id: 'l5-q10-a1', text: 'Sistema simpatico e parasimpatico', isCorrect: true },
          { id: 'l5-q10-a2', text: 'Sistema centrale e periferico', isCorrect: false },
          { id: 'l5-q10-a3', text: 'Sistema motorio e sensitivo', isCorrect: false },
          { id: 'l5-q10-a4', text: 'Sistema volontario e involontario', isCorrect: false }
        ]
      },
      {
        id: 'l5-q11',
        lessonId: 5,
        questionNumber: 11,
        text: 'Cosa fa il sistema nervoso simpatico?',
        answers: [
          { id: 'l5-q11-a1', text: 'Prepara l\'organismo all\'azione (lotta o fuga)', isCorrect: true },
          { id: 'l5-q11-a2', text: 'Rilassa l\'organismo', isCorrect: false },
          { id: 'l5-q11-a3', text: 'Controlla solo la digestione', isCorrect: false },
          { id: 'l5-q11-a4', text: 'Regola solo il sonno', isCorrect: false }
        ]
      },
      {
        id: 'l5-q12',
        lessonId: 5,
        questionNumber: 12,
        text: 'Cosa fa il sistema nervoso parasimpatico?',
        answers: [
          { id: 'l5-q12-a1', text: 'Rilassa l\'organismo e favorisce il riposo', isCorrect: true },
          { id: 'l5-q12-a2', text: 'Attiva l\'organismo', isCorrect: false },
          { id: 'l5-q12-a3', text: 'Controlla solo il cuore', isCorrect: false },
          { id: 'l5-q12-a4', text: 'Regola solo la pressione', isCorrect: false }
        ]
      },
      {
        id: 'l5-q13',
        lessonId: 5,
        questionNumber: 13,
        text: 'Quale è la funzione del midollo spinale?',
        answers: [
          { id: 'l5-q13-a1', text: 'Trasmettere impulsi tra cervello e corpo, riflessi', isCorrect: true },
          { id: 'l5-q13-a2', text: 'Solo controllare i movimenti', isCorrect: false },
          { id: 'l5-q13-a3', text: 'Solo regolare la temperatura', isCorrect: false },
          { id: 'l5-q13-a4', text: 'Solo produrre ormoni', isCorrect: false }
        ]
      },
      {
        id: 'l5-q14',
        lessonId: 5,
        questionNumber: 14,
        text: 'Cosa sono i nervi cranici?',
        answers: [
          { id: 'l5-q14-a1', text: 'Nervi che partono direttamente dall\'encefalo', isCorrect: true },
          { id: 'l5-q14-a2', text: 'Nervi del midollo spinale', isCorrect: false },
          { id: 'l5-q14-a3', text: 'Nervi periferici', isCorrect: false },
          { id: 'l5-q14-a4', text: 'Nervi autonomi', isCorrect: false }
        ]
      },
      {
        id: 'l5-q15',
        lessonId: 5,
        questionNumber: 15,
        text: 'Quanti sono i nervi cranici?',
        answers: [
          { id: 'l5-q15-a1', text: '12 paia', isCorrect: true },
          { id: 'l5-q15-a2', text: '10 paia', isCorrect: false },
          { id: 'l5-q15-a3', text: '8 paia', isCorrect: false },
          { id: 'l5-q15-a4', text: '14 paia', isCorrect: false }
        ]
      },
      {
        id: 'l5-q16',
        lessonId: 5,
        questionNumber: 16,
        text: 'Cosa protegge il sistema nervoso centrale?',
        answers: [
          { id: 'l5-q16-a1', text: 'Ossa (cranio e colonna vertebrale) e meningi', isCorrect: true },
          { id: 'l5-q16-a2', text: 'Solo le ossa', isCorrect: false },
          { id: 'l5-q16-a3', text: 'Solo i muscoli', isCorrect: false },
          { id: 'l5-q16-a4', text: 'Solo la pelle', isCorrect: false }
        ]
      },
      {
        id: 'l5-q17',
        lessonId: 5,
        questionNumber: 17,
        text: 'Quali sono le meningi?',
        answers: [
          { id: 'l5-q17-a1', text: 'Membrane protettive che avvolgono encefalo e midollo spinale', isCorrect: true },
          { id: 'l5-q17-a2', text: 'Parti del cervello', isCorrect: false },
          { id: 'l5-q17-a3', text: 'Tipi di neuroni', isCorrect: false },
          { id: 'l5-q17-a4', text: 'Nervi periferici', isCorrect: false }
        ]
      },
      {
        id: 'l5-q18',
        lessonId: 5,
        questionNumber: 18,
        text: 'Cosa significa emisfero cerebrale?',
        answers: [
          { id: 'l5-q18-a1', text: 'Metà del cervello (destro o sinistro)', isCorrect: true },
          { id: 'l5-q18-a2', text: 'Parte del cervelletto', isCorrect: false },
          { id: 'l5-q18-a3', text: 'Tipo di neurone', isCorrect: false },
          { id: 'l5-q18-a4', text: 'Nervo cranico', isCorrect: false }
        ]
      },
      {
        id: 'l5-q19',
        lessonId: 5,
        questionNumber: 19,
        text: 'Quale funzione ha l\'ipotalamo?',
        answers: [
          { id: 'l5-q19-a1', text: 'Regolare temperatura, fame, sete, sonno', isCorrect: true },
          { id: 'l5-q19-a2', text: 'Solo controllare i movimenti', isCorrect: false },
          { id: 'l5-q19-a3', text: 'Solo regolare la respirazione', isCorrect: false },
          { id: 'l5-q19-a4', text: 'Solo produrre ormoni', isCorrect: false }
        ]
      },
      {
        id: 'l5-q20',
        lessonId: 5,
        questionNumber: 20,
        text: 'Cosa sono i riflessi?',
        answers: [
          { id: 'l5-q20-a1', text: 'Risposte automatiche e involontarie a stimoli', isCorrect: true },
          { id: 'l5-q20-a2', text: 'Movimenti volontari', isCorrect: false },
          { id: 'l5-q20-a3', text: 'Pensieri coscienti', isCorrect: false },
          { id: 'l5-q20-a4', text: 'Emozioni', isCorrect: false }
        ]
      }
    ];
  }

  private createCardiovascularQuestions(): Question[] {
    return [
      {
        id: 'l6-q1',
        lessonId: 6,
        questionNumber: 1,
        text: 'Quale è la funzione principale del sistema cardiocircolatorio?',
        answers: [
          { id: 'l6-q1-a1', text: 'Trasportare ossigeno, nutrienti e rimuovere scorie', isCorrect: true },
          { id: 'l6-q1-a2', text: 'Solo pompare il sangue', isCorrect: false },
          { id: 'l6-q1-a3', text: 'Solo trasportare ossigeno', isCorrect: false },
          { id: 'l6-q1-a4', text: 'Solo regolare la temperatura', isCorrect: false }
        ]
      },
      {
        id: 'l6-q2',
        lessonId: 6,
        questionNumber: 2,
        text: 'Quante camere ha il cuore?',
        answers: [
          { id: 'l6-q2-a1', text: '4 (2 atri e 2 ventricoli)', isCorrect: true },
          { id: 'l6-q2-a2', text: '2 (1 atrio e 1 ventricolo)', isCorrect: false },
          { id: 'l6-q2-a3', text: '3 (1 atrio e 2 ventricoli)', isCorrect: false },
          { id: 'l6-q2-a4', text: '6 (3 atri e 3 ventricoli)', isCorrect: false }
        ]
      },
      {
        id: 'l6-q3',
        lessonId: 6,
        questionNumber: 3,
        text: 'Quale valvola separa l\'atrio destro dal ventricolo destro?',
        answers: [
          { id: 'l6-q3-a1', text: 'Valvola tricuspide', isCorrect: true },
          { id: 'l6-q3-a2', text: 'Valvola mitrale', isCorrect: false },
          { id: 'l6-q3-a3', text: 'Valvola aortica', isCorrect: false },
          { id: 'l6-q3-a4', text: 'Valvola polmonare', isCorrect: false }
        ]
      },
      {
        id: 'l6-q4',
        lessonId: 6,
        questionNumber: 4,
        text: 'Quale è la frequenza cardiaca normale a riposo?',
        answers: [
          { id: 'l6-q4-a1', text: '60-100 battiti al minuto', isCorrect: true },
          { id: 'l6-q4-a2', text: '40-60 battiti al minuto', isCorrect: false },
          { id: 'l6-q4-a3', text: '100-120 battiti al minuto', isCorrect: false },
          { id: 'l6-q4-a4', text: '120-150 battiti al minuto', isCorrect: false }
        ]
      },
      {
        id: 'l6-q5',
        lessonId: 6,
        questionNumber: 5,
        text: 'Cosa significa sistole?',
        answers: [
          { id: 'l6-q5-a1', text: 'Contrazione del cuore', isCorrect: true },
          { id: 'l6-q5-a2', text: 'Rilassamento del cuore', isCorrect: false },
          { id: 'l6-q5-a3', text: 'Pausa tra i battiti', isCorrect: false },
          { id: 'l6-q5-a4', text: 'Irregolarità del battito', isCorrect: false }
        ]
      },
      {
        id: 'l6-q6',
        lessonId: 6,
        questionNumber: 6,
        text: 'Cosa significa diastole?',
        answers: [
          { id: 'l6-q6-a1', text: 'Rilassamento del cuore', isCorrect: true },
          { id: 'l6-q6-a2', text: 'Contrazione del cuore', isCorrect: false },
          { id: 'l6-q6-a3', text: 'Battito cardiaco', isCorrect: false },
          { id: 'l6-q6-a4', text: 'Aritmia', isCorrect: false }
        ]
      },
      {
        id: 'l6-q7',
        lessonId: 6,
        questionNumber: 7,
        text: 'Quale arteria porta sangue ossigenato dal cuore al corpo?',
        answers: [
          { id: 'l6-q7-a1', text: 'Aorta', isCorrect: true },
          { id: 'l6-q7-a2', text: 'Arteria polmonare', isCorrect: false },
          { id: 'l6-q7-a3', text: 'Vena cava', isCorrect: false },
          { id: 'l6-q7-a4', text: 'Vena polmonare', isCorrect: false }
        ]
      },
      {
        id: 'l6-q8',
        lessonId: 6,
        questionNumber: 8,
        text: 'Quale vena porta sangue deossigenato al cuore?',
        answers: [
          { id: 'l6-q8-a1', text: 'Vena cava', isCorrect: true },
          { id: 'l6-q8-a2', text: 'Aorta', isCorrect: false },
          { id: 'l6-q8-a3', text: 'Arteria polmonare', isCorrect: false },
          { id: 'l6-q8-a4', text: 'Vena polmonare', isCorrect: false }
        ]
      },
      {
        id: 'l6-q9',
        lessonId: 6,
        questionNumber: 9,
        text: 'Cosa sono le arterie?',
        answers: [
          { id: 'l6-q9-a1', text: 'Vasi che portano sangue dal cuore ai tessuti', isCorrect: true },
          { id: 'l6-q9-a2', text: 'Vasi che portano sangue dai tessuti al cuore', isCorrect: false },
          { id: 'l6-q9-a3', text: 'Vasi che portano solo ossigeno', isCorrect: false },
          { id: 'l6-q9-a4', text: 'Vasi che portano solo anidride carbonica', isCorrect: false }
        ]
      },
      {
        id: 'l6-q10',
        lessonId: 6,
        questionNumber: 10,
        text: 'Cosa sono le vene?',
        answers: [
          { id: 'l6-q10-a1', text: 'Vasi che portano sangue dai tessuti al cuore', isCorrect: true },
          { id: 'l6-q10-a2', text: 'Vasi che portano sangue dal cuore ai tessuti', isCorrect: false },
          { id: 'l6-q10-a3', text: 'Vasi che portano solo ossigeno', isCorrect: false },
          { id: 'l6-q10-a4', text: 'Vasi che portano solo nutrienti', isCorrect: false }
        ]
      },
      {
        id: 'l6-q11',
        lessonId: 6,
        questionNumber: 11,
        text: 'Quale è la pressione arteriosa normale?',
        answers: [
          { id: 'l6-q11-a1', text: '120/80 mmHg', isCorrect: true },
          { id: 'l6-q11-a2', text: '100/60 mmHg', isCorrect: false },
          { id: 'l6-q11-a3', text: '140/90 mmHg', isCorrect: false },
          { id: 'l6-q11-a4', text: '160/100 mmHg', isCorrect: false }
        ]
      },
      {
        id: 'l6-q12',
        lessonId: 6,
        questionNumber: 12,
        text: 'Cosa significa pressione sistolica?',
        answers: [
          { id: 'l6-q12-a1', text: 'Pressione durante la contrazione cardiaca', isCorrect: true },
          { id: 'l6-q12-a2', text: 'Pressione durante il rilassamento cardiaco', isCorrect: false },
          { id: 'l6-q12-a3', text: 'Pressione media', isCorrect: false },
          { id: 'l6-q12-a4', text: 'Pressione minima', isCorrect: false }
        ]
      },
      {
        id: 'l6-q13',
        lessonId: 6,
        questionNumber: 13,
        text: 'Cosa significa pressione diastolica?',
        answers: [
          { id: 'l6-q13-a1', text: 'Pressione durante il rilassamento cardiaco', isCorrect: true },
          { id: 'l6-q13-a2', text: 'Pressione durante la contrazione cardiaca', isCorrect: false },
          { id: 'l6-q13-a3', text: 'Pressione massima', isCorrect: false },
          { id: 'l6-q13-a4', text: 'Pressione media', isCorrect: false }
        ]
      },
      {
        id: 'l6-q14',
        lessonId: 6,
        questionNumber: 14,
        text: 'Cosa sono i capillari?',
        answers: [
          { id: 'l6-q14-a1', text: 'Vasi sanguigni molto piccoli dove avviene lo scambio', isCorrect: true },
          { id: 'l6-q14-a2', text: 'Vasi sanguigni grandi', isCorrect: false },
          { id: 'l6-q14-a3', text: 'Valvole cardiache', isCorrect: false },
          { id: 'l6-q14-a4', text: 'Camere cardiache', isCorrect: false }
        ]
      },
      {
        id: 'l6-q15',
        lessonId: 6,
        questionNumber: 15,
        text: 'Quale è la circolazione polmonare?',
        answers: [
          { id: 'l6-q15-a1', text: 'Circolazione tra cuore e polmoni per l\'ossigenazione', isCorrect: true },
          { id: 'l6-q15-a2', text: 'Circolazione tra cuore e corpo', isCorrect: false },
          { id: 'l6-q15-a3', text: 'Circolazione solo nei polmoni', isCorrect: false },
          { id: 'l6-q15-a4', text: 'Circolazione solo nel cuore', isCorrect: false }
        ]
      },
      {
        id: 'l6-q16',
        lessonId: 6,
        questionNumber: 16,
        text: 'Quale è la circolazione sistemica?',
        answers: [
          { id: 'l6-q16-a1', text: 'Circolazione tra cuore e tutto il corpo', isCorrect: true },
          { id: 'l6-q16-a2', text: 'Circolazione tra cuore e polmoni', isCorrect: false },
          { id: 'l6-q16-a3', text: 'Circolazione solo nel cuore', isCorrect: false },
          { id: 'l6-q16-a4', text: 'Circolazione solo nel cervello', isCorrect: false }
        ]
      },
      {
        id: 'l6-q17',
        lessonId: 6,
        questionNumber: 17,
        text: 'Cosa significa tachicardia?',
        answers: [
          { id: 'l6-q17-a1', text: 'Frequenza cardiaca superiore al normale', isCorrect: true },
          { id: 'l6-q17-a2', text: 'Frequenza cardiaca inferiore al normale', isCorrect: false },
          { id: 'l6-q17-a3', text: 'Battito irregolare', isCorrect: false },
          { id: 'l6-q17-a4', text: 'Arresto cardiaco', isCorrect: false }
        ]
      },
      {
        id: 'l6-q18',
        lessonId: 6,
        questionNumber: 18,
        text: 'Cosa significa bradicardia?',
        answers: [
          { id: 'l6-q18-a1', text: 'Frequenza cardiaca inferiore al normale', isCorrect: true },
          { id: 'l6-q18-a2', text: 'Frequenza cardiaca superiore al normale', isCorrect: false },
          { id: 'l6-q18-a3', text: 'Battito irregolare', isCorrect: false },
          { id: 'l6-q18-a4', text: 'Battito normale', isCorrect: false }
        ]
      },
      {
        id: 'l6-q19',
        lessonId: 6,
        questionNumber: 19,
        text: 'Quale è la funzione delle valvole cardiache?',
        answers: [
          { id: 'l6-q19-a1', text: 'Impedire il reflusso del sangue', isCorrect: true },
          { id: 'l6-q19-a2', text: 'Accelerare il flusso sanguigno', isCorrect: false },
          { id: 'l6-q19-a3', text: 'Rallentare il flusso sanguigno', isCorrect: false },
          { id: 'l6-q19-a4', text: 'Produrre sangue', isCorrect: false }
        ]
      },
      {
        id: 'l6-q20',
        lessonId: 6,
        questionNumber: 20,
        text: 'Cosa significa ipertensione?',
        answers: [
          { id: 'l6-q20-a1', text: 'Pressione arteriosa elevata', isCorrect: true },
          { id: 'l6-q20-a2', text: 'Pressione arteriosa bassa', isCorrect: false },
          { id: 'l6-q20-a3', text: 'Pressione arteriosa normale', isCorrect: false },
          { id: 'l6-q20-a4', text: 'Pressione arteriosa irregolare', isCorrect: false }
        ]
      }
    ];
  }

  private createRespiratoryQuestions(): Question[] {
    return [
      {
        id: 'l7-q1',
        lessonId: 7,
        questionNumber: 1,
        text: 'Quale è la funzione principale dell\'apparato respiratorio?',
        answers: [
          { id: 'l7-q1-a1', text: 'Scambiare ossigeno e anidride carbonica', isCorrect: true },
          { id: 'l7-q1-a2', text: 'Solo portare ossigeno', isCorrect: false },
          { id: 'l7-q1-a3', text: 'Solo eliminare anidride carbonica', isCorrect: false },
          { id: 'l7-q1-a4', text: 'Solo regolare la temperatura', isCorrect: false }
        ]
      },
      {
        id: 'l7-q2',
        lessonId: 7,
        questionNumber: 2,
        text: 'Quali sono le vie aeree superiori?',
        answers: [
          { id: 'l7-q2-a1', text: 'Naso, faringe, laringe', isCorrect: true },
          { id: 'l7-q2-a2', text: 'Trachea, bronchi, polmoni', isCorrect: false },
          { id: 'l7-q2-a3', text: 'Solo il naso', isCorrect: false },
          { id: 'l7-q2-a4', text: 'Solo la faringe', isCorrect: false }
        ]
      },
      {
        id: 'l7-q3',
        lessonId: 7,
        questionNumber: 3,
        text: 'Quali sono le vie aeree inferiori?',
        answers: [
          { id: 'l7-q3-a1', text: 'Trachea, bronchi, bronchioli, alveoli', isCorrect: true },
          { id: 'l7-q3-a2', text: 'Naso, faringe, laringe', isCorrect: false },
          { id: 'l7-q3-a3', text: 'Solo la trachea', isCorrect: false },
          { id: 'l7-q3-a4', text: 'Solo i polmoni', isCorrect: false }
        ]
      },
      {
        id: 'l7-q4',
        lessonId: 7,
        questionNumber: 4,
        text: 'Dove avviene lo scambio gassoso?',
        answers: [
          { id: 'l7-q4-a1', text: 'Negli alveoli polmonari', isCorrect: true },
          { id: 'l7-q4-a2', text: 'Nella trachea', isCorrect: false },
          { id: 'l7-q4-a3', text: 'Nei bronchi', isCorrect: false },
          { id: 'l7-q4-a4', text: 'Nella laringe', isCorrect: false }
        ]
      },
      {
        id: 'l7-q5',
        lessonId: 7,
        questionNumber: 5,
        text: 'Quale è la frequenza respiratoria normale negli adulti?',
        answers: [
          { id: 'l7-q5-a1', text: '12-20 atti respiratori al minuto', isCorrect: true },
          { id: 'l7-q5-a2', text: '8-12 atti respiratori al minuto', isCorrect: false },
          { id: 'l7-q5-a3', text: '20-30 atti respiratori al minuto', isCorrect: false },
          { id: 'l7-q5-a4', text: '30-40 atti respiratori al minuto', isCorrect: false }
        ]
      },
      {
        id: 'l7-q6',
        lessonId: 7,
        questionNumber: 6,
        text: 'Cosa significa inspirazione?',
        answers: [
          { id: 'l7-q6-a1', text: 'Ingresso di aria nei polmoni', isCorrect: true },
          { id: 'l7-q6-a2', text: 'Uscita di aria dai polmoni', isCorrect: false },
          { id: 'l7-q6-a3', text: 'Pausa respiratoria', isCorrect: false },
          { id: 'l7-q6-a4', text: 'Difficoltà respiratoria', isCorrect: false }
        ]
      },
      {
        id: 'l7-q7',
        lessonId: 7,
        questionNumber: 7,
        text: 'Cosa significa espirazione?',
        answers: [
          { id: 'l7-q7-a1', text: 'Uscita di aria dai polmoni', isCorrect: true },
          { id: 'l7-q7-a2', text: 'Ingresso di aria nei polmoni', isCorrect: false },
          { id: 'l7-q7-a3', text: 'Pausa respiratoria', isCorrect: false },
          { id: 'l7-q7-a4', text: 'Difficoltà respiratoria', isCorrect: false }
        ]
      },
      {
        id: 'l7-q8',
        lessonId: 7,
        questionNumber: 8,
        text: 'Quale muscolo è principale per la respirazione?',
        answers: [
          { id: 'l7-q8-a1', text: 'Diaframma', isCorrect: true },
          { id: 'l7-q8-a2', text: 'Muscoli intercostali', isCorrect: false },
          { id: 'l7-q8-a3', text: 'Muscoli addominali', isCorrect: false },
          { id: 'l7-q8-a4', text: 'Muscoli del collo', isCorrect: false }
        ]
      },
      {
        id: 'l7-q9',
        lessonId: 7,
        questionNumber: 9,
        text: 'Cosa significa dispnea?',
        answers: [
          { id: 'l7-q9-a1', text: 'Difficoltà respiratoria', isCorrect: true },
          { id: 'l7-q9-a2', text: 'Respirazione normale', isCorrect: false },
          { id: 'l7-q9-a3', text: 'Respirazione rapida', isCorrect: false },
          { id: 'l7-q9-a4', text: 'Arresto respiratorio', isCorrect: false }
        ]
      },
      {
        id: 'l7-q10',
        lessonId: 7,
        questionNumber: 10,
        text: 'Cosa significa tachipnea?',
        answers: [
          { id: 'l7-q10-a1', text: 'Frequenza respiratoria aumentata', isCorrect: true },
          { id: 'l7-q10-a2', text: 'Frequenza respiratoria diminuita', isCorrect: false },
          { id: 'l7-q10-a3', text: 'Respirazione normale', isCorrect: false },
          { id: 'l7-q10-a4', text: 'Arresto respiratorio', isCorrect: false }
        ]
      },
      {
        id: 'l7-q11',
        lessonId: 7,
        questionNumber: 11,
        text: 'Cosa significa bradipnea?',
        answers: [
          { id: 'l7-q11-a1', text: 'Frequenza respiratoria diminuita', isCorrect: true },
          { id: 'l7-q11-a2', text: 'Frequenza respiratoria aumentata', isCorrect: false },
          { id: 'l7-q11-a3', text: 'Respirazione normale', isCorrect: false },
          { id: 'l7-q11-a4', text: 'Difficoltà respiratoria', isCorrect: false }
        ]
      },
      {
        id: 'l7-q12',
        lessonId: 7,
        questionNumber: 12,
        text: 'Cosa significa apnea?',
        answers: [
          { id: 'l7-q12-a1', text: 'Assenza temporanea di respirazione', isCorrect: true },
          { id: 'l7-q12-a2', text: 'Respirazione rapida', isCorrect: false },
          { id: 'l7-q12-a3', text: 'Respirazione lenta', isCorrect: false },
          { id: 'l7-q12-a4', text: 'Respirazione normale', isCorrect: false }
        ]
      },
      {
        id: 'l7-q13',
        lessonId: 7,
        questionNumber: 13,
        text: 'Quale è la saturazione di ossigeno normale?',
        answers: [
          { id: 'l7-q13-a1', text: '95-100%', isCorrect: true },
          { id: 'l7-q13-a2', text: '85-90%', isCorrect: false },
          { id: 'l7-q13-a3', text: '90-95%', isCorrect: false },
          { id: 'l7-q13-a4', text: '100-105%', isCorrect: false }
        ]
      },
      {
        id: 'l7-q14',
        lessonId: 7,
        questionNumber: 14,
        text: 'Cosa significa SpO2?',
        answers: [
          { id: 'l7-q14-a1', text: 'Saturazione periferica di ossigeno', isCorrect: true },
          { id: 'l7-q14-a2', text: 'Saturazione polmonare di ossigeno', isCorrect: false },
          { id: 'l7-q14-a3', text: 'Saturazione cardiaca di ossigeno', isCorrect: false },
          { id: 'l7-q14-a4', text: 'Saturazione ematica di ossigeno', isCorrect: false }
        ]
      },
      {
        id: 'l7-q15',
        lessonId: 7,
        questionNumber: 15,
        text: 'Quale è la funzione della laringe?',
        answers: [
          { id: 'l7-q15-a1', text: 'Produrre la voce e proteggere le vie aeree', isCorrect: true },
          { id: 'l7-q15-a2', text: 'Solo produrre la voce', isCorrect: false },
          { id: 'l7-q15-a3', text: 'Solo filtrare l\'aria', isCorrect: false },
          { id: 'l7-q15-a4', text: 'Solo scambiare gas', isCorrect: false }
        ]
      },
      {
        id: 'l7-q16',
        lessonId: 7,
        questionNumber: 16,
        text: 'Quale è la funzione del naso?',
        answers: [
          { id: 'l7-q16-a1', text: 'Filtrare, umidificare e riscaldare l\'aria', isCorrect: true },
          { id: 'l7-q16-a2', text: 'Solo filtrare l\'aria', isCorrect: false },
          { id: 'l7-q16-a3', text: 'Solo produrre la voce', isCorrect: false },
          { id: 'l7-q16-a4', text: 'Solo scambiare gas', isCorrect: false }
        ]
      },
      {
        id: 'l7-q17',
        lessonId: 7,
        questionNumber: 17,
        text: 'Quanti polmoni ha l\'essere umano?',
        answers: [
          { id: 'l7-q17-a1', text: '2 (destro e sinistro)', isCorrect: true },
          { id: 'l7-q17-a2', text: '1', isCorrect: false },
          { id: 'l7-q17-a3', text: '3', isCorrect: false },
          { id: 'l7-q17-a4', text: '4', isCorrect: false }
        ]
      },
      {
        id: 'l7-q18',
        lessonId: 7,
        questionNumber: 18,
        text: 'Cosa significa emogasanalisi?',
        answers: [
          { id: 'l7-q18-a1', text: 'Analisi dei gas nel sangue', isCorrect: true },
          { id: 'l7-q18-a2', text: 'Analisi dell\'aria', isCorrect: false },
          { id: 'l7-q18-a3', text: 'Analisi dei polmoni', isCorrect: false },
          { id: 'l7-q18-a4', text: 'Analisi della respirazione', isCorrect: false }
        ]
      },
      {
        id: 'l7-q19',
        lessonId: 7,
        questionNumber: 19,
        text: 'Cosa significa ipossia?',
        answers: [
          { id: 'l7-q19-a1', text: 'Carenza di ossigeno nei tessuti', isCorrect: true },
          { id: 'l7-q19-a2', text: 'Eccesso di ossigeno', isCorrect: false },
          { id: 'l7-q19-a3', text: 'Carenza di anidride carbonica', isCorrect: false },
          { id: 'l7-q19-a4', text: 'Respirazione normale', isCorrect: false }
        ]
      },
      {
        id: 'l7-q20',
        lessonId: 7,
        questionNumber: 20,
        text: 'Quale è la capacità polmonare totale?',
        answers: [
          { id: 'l7-q20-a1', text: 'Circa 5-6 litri', isCorrect: true },
          { id: 'l7-q20-a2', text: 'Circa 2-3 litri', isCorrect: false },
          { id: 'l7-q20-a3', text: 'Circa 8-10 litri', isCorrect: false },
          { id: 'l7-q20-a4', text: 'Circa 10-12 litri', isCorrect: false }
        ]
      }
    ];
  }

  private createDigestiveQuestions(): Question[] {
    return [
      {
        id: 'l8-q1',
        lessonId: 8,
        questionNumber: 1,
        text: 'Quale è la funzione principale dell\'apparato digerente?',
        answers: [
          { id: 'l8-q1-a1', text: 'Digerire il cibo e assorbire i nutrienti', isCorrect: true },
          { id: 'l8-q1-a2', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q1-a3', text: 'Solo assorbire i nutrienti', isCorrect: false },
          { id: 'l8-q1-a4', text: 'Solo eliminare le scorie', isCorrect: false }
        ]
      },
      {
        id: 'l8-q2',
        lessonId: 8,
        questionNumber: 2,
        text: 'Quale è il primo organo dell\'apparato digerente?',
        answers: [
          { id: 'l8-q2-a1', text: 'Bocca', isCorrect: true },
          { id: 'l8-q2-a2', text: 'Esofago', isCorrect: false },
          { id: 'l8-q2-a3', text: 'Stomaco', isCorrect: false },
          { id: 'l8-q2-a4', text: 'Intestino', isCorrect: false }
        ]
      },
      {
        id: 'l8-q3',
        lessonId: 8,
        questionNumber: 3,
        text: 'Quale è la funzione dello stomaco?',
        answers: [
          { id: 'l8-q3-a1', text: 'Mescolare e digerire parzialmente il cibo', isCorrect: true },
          { id: 'l8-q3-a2', text: 'Solo assorbire i nutrienti', isCorrect: false },
          { id: 'l8-q3-a3', text: 'Solo eliminare le scorie', isCorrect: false },
          { id: 'l8-q3-a4', text: 'Solo produrre enzimi', isCorrect: false }
        ]
      },
      {
        id: 'l8-q4',
        lessonId: 8,
        questionNumber: 4,
        text: 'Quale è la funzione dell\'intestino tenue?',
        answers: [
          { id: 'l8-q4-a1', text: 'Assorbire la maggior parte dei nutrienti', isCorrect: true },
          { id: 'l8-q4-a2', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q4-a3', text: 'Solo eliminare le scorie', isCorrect: false },
          { id: 'l8-q4-a4', text: 'Solo produrre enzimi', isCorrect: false }
        ]
      },
      {
        id: 'l8-q5',
        lessonId: 8,
        questionNumber: 5,
        text: 'Quale è la funzione dell\'intestino crasso?',
        answers: [
          { id: 'l8-q5-a1', text: 'Assorbire acqua e formare le feci', isCorrect: true },
          { id: 'l8-q5-a2', text: 'Solo assorbire i nutrienti', isCorrect: false },
          { id: 'l8-q5-a3', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q5-a4', text: 'Solo produrre enzimi', isCorrect: false }
        ]
      },
      {
        id: 'l8-q6',
        lessonId: 8,
        questionNumber: 6,
        text: 'Quale organo produce la bile?',
        answers: [
          { id: 'l8-q6-a1', text: 'Fegato', isCorrect: true },
          { id: 'l8-q6-a2', text: 'Pancreas', isCorrect: false },
          { id: 'l8-q6-a3', text: 'Stomaco', isCorrect: false },
          { id: 'l8-q6-a4', text: 'Intestino', isCorrect: false }
        ]
      },
      {
        id: 'l8-q7',
        lessonId: 8,
        questionNumber: 7,
        text: 'Dove viene immagazzinata la bile?',
        answers: [
          { id: 'l8-q7-a1', text: 'Cistifellea', isCorrect: true },
          { id: 'l8-q7-a2', text: 'Fegato', isCorrect: false },
          { id: 'l8-q7-a3', text: 'Pancreas', isCorrect: false },
          { id: 'l8-q7-a4', text: 'Stomaco', isCorrect: false }
        ]
      },
      {
        id: 'l8-q8',
        lessonId: 8,
        questionNumber: 8,
        text: 'Quale è la funzione del pancreas?',
        answers: [
          { id: 'l8-q8-a1', text: 'Produrre enzimi digestivi e insulina', isCorrect: true },
          { id: 'l8-q8-a2', text: 'Solo produrre bile', isCorrect: false },
          { id: 'l8-q8-a3', text: 'Solo assorbire nutrienti', isCorrect: false },
          { id: 'l8-q8-a4', text: 'Solo digerire il cibo', isCorrect: false }
        ]
      },
      {
        id: 'l8-q9',
        lessonId: 8,
        questionNumber: 9,
        text: 'Cosa sono gli enzimi digestivi?',
        answers: [
          { id: 'l8-q9-a1', text: 'Sostanze che scompongono il cibo', isCorrect: true },
          { id: 'l8-q9-a2', text: 'Sostanze che assorbono il cibo', isCorrect: false },
          { id: 'l8-q9-a3', text: 'Sostanze che eliminano il cibo', isCorrect: false },
          { id: 'l8-q9-a4', text: 'Sostanze che conservano il cibo', isCorrect: false }
        ]
      },
      {
        id: 'l8-q10',
        lessonId: 8,
        questionNumber: 10,
        text: 'Quale è la funzione della saliva?',
        answers: [
          { id: 'l8-q10-a1', text: 'Iniziare la digestione e lubrificare il cibo', isCorrect: true },
          { id: 'l8-q10-a2', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q10-a3', text: 'Solo assorbire nutrienti', isCorrect: false },
          { id: 'l8-q10-a4', text: 'Solo eliminare scorie', isCorrect: false }
        ]
      },
      {
        id: 'l8-q11',
        lessonId: 8,
        questionNumber: 11,
        text: 'Cosa significa peristalsi?',
        answers: [
          { id: 'l8-q11-a1', text: 'Movimento ondulatorio che spinge il cibo', isCorrect: true },
          { id: 'l8-q11-a2', text: 'Digestione del cibo', isCorrect: false },
          { id: 'l8-q11-a3', text: 'Assorbimento dei nutrienti', isCorrect: false },
          { id: 'l8-q11-a4', text: 'Eliminazione delle feci', isCorrect: false }
        ]
      },
      {
        id: 'l8-q12',
        lessonId: 8,
        questionNumber: 12,
        text: 'Quale è la funzione dell\'esofago?',
        answers: [
          { id: 'l8-q12-a1', text: 'Trasportare il cibo dalla bocca allo stomaco', isCorrect: true },
          { id: 'l8-q12-a2', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q12-a3', text: 'Solo assorbire nutrienti', isCorrect: false },
          { id: 'l8-q12-a4', text: 'Solo produrre enzimi', isCorrect: false }
        ]
      },
      {
        id: 'l8-q13',
        lessonId: 8,
        questionNumber: 13,
        text: 'Cosa significa disfagia?',
        answers: [
          { id: 'l8-q13-a1', text: 'Difficoltà a deglutire', isCorrect: true },
          { id: 'l8-q13-a2', text: 'Difficoltà a digerire', isCorrect: false },
          { id: 'l8-q13-a3', text: 'Difficoltà ad assorbire', isCorrect: false },
          { id: 'l8-q13-a4', text: 'Difficoltà ad eliminare', isCorrect: false }
        ]
      },
      {
        id: 'l8-q14',
        lessonId: 8,
        questionNumber: 14,
        text: 'Cosa significa stipsi?',
        answers: [
          { id: 'l8-q14-a1', text: 'Stitichezza, difficoltà nell\'evacuazione', isCorrect: true },
          { id: 'l8-q14-a2', text: 'Diarrea', isCorrect: false },
          { id: 'l8-q14-a3', text: 'Digestione normale', isCorrect: false },
          { id: 'l8-q14-a4', text: 'Assorbimento alterato', isCorrect: false }
        ]
      },
      {
        id: 'l8-q15',
        lessonId: 8,
        questionNumber: 15,
        text: 'Cosa significa diarrea?',
        answers: [
          { id: 'l8-q15-a1', text: 'Evacuazioni frequenti e liquide', isCorrect: true },
          { id: 'l8-q15-a2', text: 'Stitichezza', isCorrect: false },
          { id: 'l8-q15-a3', text: 'Digestione normale', isCorrect: false },
          { id: 'l8-q15-a4', text: 'Assorbimento normale', isCorrect: false }
        ]
      },
      {
        id: 'l8-q16',
        lessonId: 8,
        questionNumber: 16,
        text: 'Quale è la lunghezza approssimativa dell\'intestino tenue?',
        answers: [
          { id: 'l8-q16-a1', text: 'Circa 6-7 metri', isCorrect: true },
          { id: 'l8-q16-a2', text: 'Circa 2-3 metri', isCorrect: false },
          { id: 'l8-q16-a3', text: 'Circa 10-12 metri', isCorrect: false },
          { id: 'l8-q16-a4', text: 'Circa 1 metro', isCorrect: false }
        ]
      },
      {
        id: 'l8-q17',
        lessonId: 8,
        questionNumber: 17,
        text: 'Quale è la lunghezza approssimativa dell\'intestino crasso?',
        answers: [
          { id: 'l8-q17-a1', text: 'Circa 1,5 metri', isCorrect: true },
          { id: 'l8-q17-a2', text: 'Circa 3 metri', isCorrect: false },
          { id: 'l8-q17-a3', text: 'Circa 6 metri', isCorrect: false },
          { id: 'l8-q17-a4', text: 'Circa 0,5 metri', isCorrect: false }
        ]
      },
      {
        id: 'l8-q18',
        lessonId: 8,
        questionNumber: 18,
        text: 'Cosa significa reflusso gastroesofageo?',
        answers: [
          { id: 'l8-q18-a1', text: 'Risalita del contenuto gastrico nell\'esofago', isCorrect: true },
          { id: 'l8-q18-a2', text: 'Difficoltà a deglutire', isCorrect: false },
          { id: 'l8-q18-a3', text: 'Digestione lenta', isCorrect: false },
          { id: 'l8-q18-a4', text: 'Assorbimento alterato', isCorrect: false }
        ]
      },
      {
        id: 'l8-q19',
        lessonId: 8,
        questionNumber: 19,
        text: 'Quale è la funzione del fegato?',
        answers: [
          { id: 'l8-q19-a1', text: 'Produrre bile, metabolizzare sostanze, immagazzinare glicogeno', isCorrect: true },
          { id: 'l8-q19-a2', text: 'Solo produrre bile', isCorrect: false },
          { id: 'l8-q19-a3', text: 'Solo digerire il cibo', isCorrect: false },
          { id: 'l8-q19-a4', text: 'Solo assorbire nutrienti', isCorrect: false }
        ]
      },
      {
        id: 'l8-q20',
        lessonId: 8,
        questionNumber: 20,
        text: 'Cosa significa malassorbimento?',
        answers: [
          { id: 'l8-q20-a1', text: 'Difficoltà nell\'assorbimento dei nutrienti', isCorrect: true },
          { id: 'l8-q20-a2', text: 'Difficoltà nella digestione', isCorrect: false },
          { id: 'l8-q20-a3', text: 'Difficoltà nell\'eliminazione', isCorrect: false },
          { id: 'l8-q20-a4', text: 'Digestione normale', isCorrect: false }
        ]
      }
    ];
  }

  // Complete implementations for all remaining topics
  private createGenitourinaryQuestions(): Question[] {
    return [
      {
        id: 'l9-q1',
        lessonId: 9,
        questionNumber: 1,
        text: 'Quale è la funzione principale dell\'apparato urinario?',
        answers: [
          { id: 'l9-q1-a1', text: 'Filtrare il sangue e produrre urina', isCorrect: true },
          { id: 'l9-q1-a2', text: 'Solo produrre urina', isCorrect: false },
          { id: 'l9-q1-a3', text: 'Solo filtrare il sangue', isCorrect: false },
          { id: 'l9-q1-a4', text: 'Solo regolare la temperatura', isCorrect: false }
        ]
      },
      {
        id: 'l9-q2',
        lessonId: 9,
        questionNumber: 2,
        text: 'Quali sono gli organi principali dell\'apparato urinario?',
        answers: [
          { id: 'l9-q2-a1', text: 'Reni, ureteri, vescica, uretra', isCorrect: true },
          { id: 'l9-q2-a2', text: 'Solo i reni', isCorrect: false },
          { id: 'l9-q2-a3', text: 'Reni e vescica', isCorrect: false },
          { id: 'l9-q2-a4', text: 'Reni e fegato', isCorrect: false }
        ]
      },
      {
        id: 'l9-q3',
        lessonId: 9,
        questionNumber: 3,
        text: 'Quale è la funzione dei reni?',
        answers: [
          { id: 'l9-q3-a1', text: 'Filtrare il sangue, produrre urina, regolare equilibrio idro-salino', isCorrect: true },
          { id: 'l9-q3-a2', text: 'Solo produrre urina', isCorrect: false },
          { id: 'l9-q3-a3', text: 'Solo filtrare il sangue', isCorrect: false },
          { id: 'l9-q3-a4', text: 'Solo regolare la pressione', isCorrect: false }
        ]
      },
      {
        id: 'l9-q4',
        lessonId: 9,
        questionNumber: 4,
        text: 'Cosa significa minzione?',
        answers: [
          { id: 'l9-q4-a1', text: 'Eliminazione dell\'urina', isCorrect: true },
          { id: 'l9-q4-a2', text: 'Produzione dell\'urina', isCorrect: false },
          { id: 'l9-q4-a3', text: 'Filtrazione del sangue', isCorrect: false },
          { id: 'l9-q4-a4', text: 'Ritenzione dell\'urina', isCorrect: false }
        ]
      },
      {
        id: 'l9-q5',
        lessonId: 9,
        questionNumber: 5,
        text: 'Cosa significa ritenzione urinaria?',
        answers: [
          { id: 'l9-q5-a1', text: 'Impossibilità di svuotare la vescica', isCorrect: true },
          { id: 'l9-q5-a2', text: 'Eccessiva produzione di urina', isCorrect: false },
          { id: 'l9-q5-a3', text: 'Minzione frequente', isCorrect: false },
          { id: 'l9-q5-a4', text: 'Incontinenza urinaria', isCorrect: false }
        ]
      },
      {
        id: 'l9-q6',
        lessonId: 9,
        questionNumber: 6,
        text: 'Cosa significa incontinenza urinaria?',
        answers: [
          { id: 'l9-q6-a1', text: 'Perdita involontaria di urina', isCorrect: true },
          { id: 'l9-q6-a2', text: 'Impossibilità di urinare', isCorrect: false },
          { id: 'l9-q6-a3', text: 'Produzione eccessiva di urina', isCorrect: false },
          { id: 'l9-q6-a4', text: 'Minzione dolorosa', isCorrect: false }
        ]
      },
      {
        id: 'l9-q7',
        lessonId: 9,
        questionNumber: 7,
        text: 'Quale è la capacità normale della vescica?',
        answers: [
          { id: 'l9-q7-a1', text: 'Circa 300-500 ml', isCorrect: true },
          { id: 'l9-q7-a2', text: 'Circa 100-200 ml', isCorrect: false },
          { id: 'l9-q7-a3', text: 'Circa 1 litro', isCorrect: false },
          { id: 'l9-q7-a4', text: 'Circa 2 litri', isCorrect: false }
        ]
      },
      {
        id: 'l9-q8',
        lessonId: 9,
        questionNumber: 8,
        text: 'Cosa significa disuria?',
        answers: [
          { id: 'l9-q8-a1', text: 'Minzione dolorosa o difficoltosa', isCorrect: true },
          { id: 'l9-q8-a2', text: 'Minzione frequente', isCorrect: false },
          { id: 'l9-q8-a3', text: 'Incontinenza', isCorrect: false },
          { id: 'l9-q8-a4', text: 'Ritenzione urinaria', isCorrect: false }
        ]
      },
      {
        id: 'l9-q9',
        lessonId: 9,
        questionNumber: 9,
        text: 'Cosa significa pollachiuria?',
        answers: [
          { id: 'l9-q9-a1', text: 'Minzione frequente con piccole quantità', isCorrect: true },
          { id: 'l9-q9-a2', text: 'Minzione dolorosa', isCorrect: false },
          { id: 'l9-q9-a3', text: 'Incontinenza', isCorrect: false },
          { id: 'l9-q9-a4', text: 'Ritenzione urinaria', isCorrect: false }
        ]
      },
      {
        id: 'l9-q10',
        lessonId: 9,
        questionNumber: 10,
        text: 'Quale è la funzione dell\'apparato genitale maschile?',
        answers: [
          { id: 'l9-q10-a1', text: 'Produzione di spermatozoi e ormoni maschili', isCorrect: true },
          { id: 'l9-q10-a2', text: 'Solo produzione di spermatozoi', isCorrect: false },
          { id: 'l9-q10-a3', text: 'Solo produzione di ormoni', isCorrect: false },
          { id: 'l9-q10-a4', text: 'Solo eliminazione di urina', isCorrect: false }
        ]
      },
      {
        id: 'l9-q11',
        lessonId: 9,
        questionNumber: 11,
        text: 'Quale è la funzione dell\'apparato genitale femminile?',
        answers: [
          { id: 'l9-q11-a1', text: 'Produzione di ovuli, gestazione, produzione di ormoni', isCorrect: true },
          { id: 'l9-q11-a2', text: 'Solo produzione di ovuli', isCorrect: false },
          { id: 'l9-q11-a3', text: 'Solo gestazione', isCorrect: false },
          { id: 'l9-q11-a4', text: 'Solo produzione di ormoni', isCorrect: false }
        ]
      },
      {
        id: 'l9-q12',
        lessonId: 9,
        questionNumber: 12,
        text: 'Cosa significa ciclo mestruale?',
        answers: [
          { id: 'l9-q12-a1', text: 'Ciclo mensile di preparazione all\'ovulazione', isCorrect: true },
          { id: 'l9-q12-a2', text: 'Solo mestruazione', isCorrect: false },
          { id: 'l9-q12-a3', text: 'Solo ovulazione', isCorrect: false },
          { id: 'l9-q12-a4', text: 'Gravidanza', isCorrect: false }
        ]
      },
      {
        id: 'l9-q13',
        lessonId: 9,
        questionNumber: 13,
        text: 'Quale è la durata media del ciclo mestruale?',
        answers: [
          { id: 'l9-q13-a1', text: 'Circa 28 giorni', isCorrect: true },
          { id: 'l9-q13-a2', text: 'Circa 14 giorni', isCorrect: false },
          { id: 'l9-q13-a3', text: 'Circa 35 giorni', isCorrect: false },
          { id: 'l9-q13-a4', text: 'Circa 21 giorni', isCorrect: false }
        ]
      },
      {
        id: 'l9-q14',
        lessonId: 9,
        questionNumber: 14,
        text: 'Cosa significa menopausa?',
        answers: [
          { id: 'l9-q14-a1', text: 'Cessazione definitiva del ciclo mestruale', isCorrect: true },
          { id: 'l9-q14-a2', text: 'Inizio del ciclo mestruale', isCorrect: false },
          { id: 'l9-q14-a3', text: 'Irregolarità del ciclo', isCorrect: false },
          { id: 'l9-q14-a4', text: 'Gravidanza', isCorrect: false }
        ]
      },
      {
        id: 'l9-q15',
        lessonId: 9,
        questionNumber: 15,
        text: 'Quale è la funzione degli ureteri?',
        answers: [
          { id: 'l9-q15-a1', text: 'Trasportare l\'urina dai reni alla vescica', isCorrect: true },
          { id: 'l9-q15-a2', text: 'Produrre urina', isCorrect: false },
          { id: 'l9-q15-a3', text: 'Filtrare il sangue', isCorrect: false },
          { id: 'l9-q15-a4', text: 'Eliminare l\'urina', isCorrect: false }
        ]
      },
      {
        id: 'l9-q16',
        lessonId: 9,
        questionNumber: 16,
        text: 'Quale è la funzione dell\'uretra?',
        answers: [
          { id: 'l9-q16-a1', text: 'Eliminare l\'urina dalla vescica all\'esterno', isCorrect: true },
          { id: 'l9-q16-a2', text: 'Produrre urina', isCorrect: false },
          { id: 'l9-q16-a3', text: 'Filtrare il sangue', isCorrect: false },
          { id: 'l9-q16-a4', text: 'Trasportare urina ai reni', isCorrect: false }
        ]
      },
      {
        id: 'l9-q17',
        lessonId: 9,
        questionNumber: 17,
        text: 'Cosa significa ematuria?',
        answers: [
          { id: 'l9-q17-a1', text: 'Presenza di sangue nelle urine', isCorrect: true },
          { id: 'l9-q17-a2', text: 'Presenza di proteine nelle urine', isCorrect: false },
          { id: 'l9-q17-a3', text: 'Presenza di glucosio nelle urine', isCorrect: false },
          { id: 'l9-q17-a4', text: 'Urina concentrata', isCorrect: false }
        ]
      },
      {
        id: 'l9-q18',
        lessonId: 9,
        questionNumber: 18,
        text: 'Cosa significa oliguria?',
        answers: [
          { id: 'l9-q18-a1', text: 'Ridotta produzione di urina', isCorrect: true },
          { id: 'l9-q18-a2', text: 'Aumentata produzione di urina', isCorrect: false },
          { id: 'l9-q18-a3', text: 'Assenza di produzione di urina', isCorrect: false },
          { id: 'l9-q18-a4', text: 'Produzione normale di urina', isCorrect: false }
        ]
      },
      {
        id: 'l9-q19',
        lessonId: 9,
        questionNumber: 19,
        text: 'Cosa significa anuria?',
        answers: [
          { id: 'l9-q19-a1', text: 'Assenza completa di produzione di urina', isCorrect: true },
          { id: 'l9-q19-a2', text: 'Ridotta produzione di urina', isCorrect: false },
          { id: 'l9-q19-a3', text: 'Aumentata produzione di urina', isCorrect: false },
          { id: 'l9-q19-a4', text: 'Produzione normale di urina', isCorrect: false }
        ]
      },
      {
        id: 'l9-q20',
        lessonId: 9,
        questionNumber: 20,
        text: 'Cosa significa poliuria?',
        answers: [
          { id: 'l9-q20-a1', text: 'Aumentata produzione di urina', isCorrect: true },
          { id: 'l9-q20-a2', text: 'Ridotta produzione di urina', isCorrect: false },
          { id: 'l9-q20-a3', text: 'Assenza di produzione di urina', isCorrect: false },
          { id: 'l9-q20-a4', text: 'Produzione normale di urina', isCorrect: false }
        ]
      }
    ];
  }

  private createEndocrineQuestions(): Question[] {
    return [
      {
        id: 'l10-q1',
        lessonId: 10,
        questionNumber: 1,
        text: 'Quale è la funzione principale del sistema endocrino?',
        answers: [
          { id: 'l10-q1-a1', text: 'Regolare le funzioni dell\'organismo attraverso ormoni', isCorrect: true },
          { id: 'l10-q1-a2', text: 'Solo produrre ormoni', isCorrect: false },
          { id: 'l10-q1-a3', text: 'Solo regolare il metabolismo', isCorrect: false },
          { id: 'l10-q1-a4', text: 'Solo controllare la crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q2',
        lessonId: 10,
        questionNumber: 2,
        text: 'Cosa sono gli ormoni?',
        answers: [
          { id: 'l10-q2-a1', text: 'Sostanze chimiche che regolano funzioni corporee', isCorrect: true },
          { id: 'l10-q2-a2', text: 'Solo proteine', isCorrect: false },
          { id: 'l10-q2-a3', text: 'Solo enzimi', isCorrect: false },
          { id: 'l10-q2-a4', text: 'Solo vitamine', isCorrect: false }
        ]
      },
      {
        id: 'l10-q3',
        lessonId: 10,
        questionNumber: 3,
        text: 'Quale ghiandola è considerata la ghiandola maestra?',
        answers: [
          { id: 'l10-q3-a1', text: 'Ipofisi', isCorrect: true },
          { id: 'l10-q3-a2', text: 'Tiroide', isCorrect: false },
          { id: 'l10-q3-a3', text: 'Surrenali', isCorrect: false },
          { id: 'l10-q3-a4', text: 'Pancreas', isCorrect: false }
        ]
      },
      {
        id: 'l10-q4',
        lessonId: 10,
        questionNumber: 4,
        text: 'Quale ormone produce il pancreas?',
        answers: [
          { id: 'l10-q4-a1', text: 'Insulina e glucagone', isCorrect: true },
          { id: 'l10-q4-a2', text: 'Solo insulina', isCorrect: false },
          { id: 'l10-q4-a3', text: 'Solo glucagone', isCorrect: false },
          { id: 'l10-q4-a4', text: 'Solo adrenalina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q5',
        lessonId: 10,
        questionNumber: 5,
        text: 'Quale è la funzione dell\'insulina?',
        answers: [
          { id: 'l10-q5-a1', text: 'Abbassare la glicemia', isCorrect: true },
          { id: 'l10-q5-a2', text: 'Alzare la glicemia', isCorrect: false },
          { id: 'l10-q5-a3', text: 'Regolare la pressione', isCorrect: false },
          { id: 'l10-q5-a4', text: 'Controllare la crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q6',
        lessonId: 10,
        questionNumber: 6,
        text: 'Quale è la funzione del glucagone?',
        answers: [
          { id: 'l10-q6-a1', text: 'Alzare la glicemia', isCorrect: true },
          { id: 'l10-q6-a2', text: 'Abbassare la glicemia', isCorrect: false },
          { id: 'l10-q6-a3', text: 'Regolare la pressione', isCorrect: false },
          { id: 'l10-q6-a4', text: 'Controllare la crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q7',
        lessonId: 10,
        questionNumber: 7,
        text: 'Quale ormone produce la tiroide?',
        answers: [
          { id: 'l10-q7-a1', text: 'Tiroxina (T4) e triiodotironina (T3)', isCorrect: true },
          { id: 'l10-q7-a2', text: 'Solo tiroxina', isCorrect: false },
          { id: 'l10-q7-a3', text: 'Solo insulina', isCorrect: false },
          { id: 'l10-q7-a4', text: 'Solo cortisolo', isCorrect: false }
        ]
      },
      {
        id: 'l10-q8',
        lessonId: 10,
        questionNumber: 8,
        text: 'Quale è la funzione degli ormoni tiroidei?',
        answers: [
          { id: 'l10-q8-a1', text: 'Regolare il metabolismo', isCorrect: true },
          { id: 'l10-q8-a2', text: 'Solo regolare la glicemia', isCorrect: false },
          { id: 'l10-q8-a3', text: 'Solo regolare la pressione', isCorrect: false },
          { id: 'l10-q8-a4', text: 'Solo controllare la crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q9',
        lessonId: 10,
        questionNumber: 9,
        text: 'Quale ormone producono le ghiandole surrenali?',
        answers: [
          { id: 'l10-q9-a1', text: 'Adrenalina, noradrenalina, cortisolo', isCorrect: true },
          { id: 'l10-q9-a2', text: 'Solo adrenalina', isCorrect: false },
          { id: 'l10-q9-a3', text: 'Solo insulina', isCorrect: false },
          { id: 'l10-q9-a4', text: 'Solo tiroxina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q10',
        lessonId: 10,
        questionNumber: 10,
        text: 'Quale è la funzione dell\'adrenalina?',
        answers: [
          { id: 'l10-q10-a1', text: 'Preparare l\'organismo allo stress (lotta o fuga)', isCorrect: true },
          { id: 'l10-q10-a2', text: 'Solo regolare la glicemia', isCorrect: false },
          { id: 'l10-q10-a3', text: 'Solo regolare la pressione', isCorrect: false },
          { id: 'l10-q10-a4', text: 'Solo controllare la crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q11',
        lessonId: 10,
        questionNumber: 11,
        text: 'Cosa significa ipertiroidismo?',
        answers: [
          { id: 'l10-q11-a1', text: 'Eccessiva produzione di ormoni tiroidei', isCorrect: true },
          { id: 'l10-q11-a2', text: 'Ridotta produzione di ormoni tiroidei', isCorrect: false },
          { id: 'l10-q11-a3', text: 'Produzione normale di ormoni', isCorrect: false },
          { id: 'l10-q11-a4', text: 'Assenza di produzione di ormoni', isCorrect: false }
        ]
      },
      {
        id: 'l10-q12',
        lessonId: 10,
        questionNumber: 12,
        text: 'Cosa significa ipotiroidismo?',
        answers: [
          { id: 'l10-q12-a1', text: 'Ridotta produzione di ormoni tiroidei', isCorrect: true },
          { id: 'l10-q12-a2', text: 'Eccessiva produzione di ormoni tiroidei', isCorrect: false },
          { id: 'l10-q12-a3', text: 'Produzione normale di ormoni', isCorrect: false },
          { id: 'l10-q12-a4', text: 'Assenza di produzione di ormoni', isCorrect: false }
        ]
      },
      {
        id: 'l10-q13',
        lessonId: 10,
        questionNumber: 13,
        text: 'Cosa significa diabete?',
        answers: [
          { id: 'l10-q13-a1', text: 'Alterazione del metabolismo del glucosio', isCorrect: true },
          { id: 'l10-q13-a2', text: 'Alterazione della pressione', isCorrect: false },
          { id: 'l10-q13-a3', text: 'Alterazione della tiroide', isCorrect: false },
          { id: 'l10-q13-a4', text: 'Alterazione della crescita', isCorrect: false }
        ]
      },
      {
        id: 'l10-q14',
        lessonId: 10,
        questionNumber: 14,
        text: 'Quale ormone controlla la crescita?',
        answers: [
          { id: 'l10-q14-a1', text: 'Ormone della crescita (GH)', isCorrect: true },
          { id: 'l10-q14-a2', text: 'Insulina', isCorrect: false },
          { id: 'l10-q14-a3', text: 'Tiroxina', isCorrect: false },
          { id: 'l10-q14-a4', text: 'Adrenalina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q15',
        lessonId: 10,
        questionNumber: 15,
        text: 'Quale ormone regola il ciclo mestruale?',
        answers: [
          { id: 'l10-q15-a1', text: 'Estrogeni e progesterone', isCorrect: true },
          { id: 'l10-q15-a2', text: 'Solo estrogeni', isCorrect: false },
          { id: 'l10-q15-a3', text: 'Solo insulina', isCorrect: false },
          { id: 'l10-q15-a4', text: 'Solo tiroxina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q16',
        lessonId: 10,
        questionNumber: 16,
        text: 'Quale ormone regola il sonno?',
        answers: [
          { id: 'l10-q16-a1', text: 'Melatonina', isCorrect: true },
          { id: 'l10-q16-a2', text: 'Adrenalina', isCorrect: false },
          { id: 'l10-q16-a3', text: 'Cortisolo', isCorrect: false },
          { id: 'l10-q16-a4', text: 'Insulina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q17',
        lessonId: 10,
        questionNumber: 17,
        text: 'Quale ormone regola la pressione arteriosa?',
        answers: [
          { id: 'l10-q17-a1', text: 'Aldosterone e renina', isCorrect: true },
          { id: 'l10-q17-a2', text: 'Solo aldosterone', isCorrect: false },
          { id: 'l10-q17-a3', text: 'Solo insulina', isCorrect: false },
          { id: 'l10-q17-a4', text: 'Solo tiroxina', isCorrect: false }
        ]
      },
      {
        id: 'l10-q18',
        lessonId: 10,
        questionNumber: 18,
        text: 'Cosa significa iperglicemia?',
        answers: [
          { id: 'l10-q18-a1', text: 'Glicemia elevata', isCorrect: true },
          { id: 'l10-q18-a2', text: 'Glicemia bassa', isCorrect: false },
          { id: 'l10-q18-a3', text: 'Glicemia normale', isCorrect: false },
          { id: 'l10-q18-a4', text: 'Assenza di glucosio', isCorrect: false }
        ]
      },
      {
        id: 'l10-q19',
        lessonId: 10,
        questionNumber: 19,
        text: 'Cosa significa ipoglicemia?',
        answers: [
          { id: 'l10-q19-a1', text: 'Glicemia bassa', isCorrect: true },
          { id: 'l10-q19-a2', text: 'Glicemia elevata', isCorrect: false },
          { id: 'l10-q19-a3', text: 'Glicemia normale', isCorrect: false },
          { id: 'l10-q19-a4', text: 'Assenza di glucosio', isCorrect: false }
        ]
      },
      {
        id: 'l10-q20',
        lessonId: 10,
        questionNumber: 20,
        text: 'Quale ghiandola produce la melatonina?',
        answers: [
          { id: 'l10-q20-a1', text: 'Ghiandola pineale', isCorrect: true },
          { id: 'l10-q20-a2', text: 'Ipofisi', isCorrect: false },
          { id: 'l10-q20-a3', text: 'Tiroide', isCorrect: false },
          { id: 'l10-q20-a4', text: 'Surrenali', isCorrect: false }
        ]
      }
    ];
  }

  private createMusculoskeletalQuestions(): Question[] {
    return [
      {
        id: 'l11-q1',
        lessonId: 11,
        questionNumber: 1,
        text: 'Quale è la funzione principale del sistema muscolo-scheletrico?',
        answers: [
          { id: 'l11-q1-a1', text: 'Sostegno, movimento, protezione degli organi', isCorrect: true },
          { id: 'l11-q1-a2', text: 'Solo movimento', isCorrect: false },
          { id: 'l11-q1-a3', text: 'Solo sostegno', isCorrect: false },
          { id: 'l11-q1-a4', text: 'Solo protezione', isCorrect: false }
        ]
      },
      {
        id: 'l11-q2',
        lessonId: 11,
        questionNumber: 2,
        text: 'Quante ossa ha lo scheletro umano adulto?',
        answers: [
          { id: 'l11-q2-a1', text: 'Circa 206 ossa', isCorrect: true },
          { id: 'l11-q2-a2', text: 'Circa 150 ossa', isCorrect: false },
          { id: 'l11-q2-a3', text: 'Circa 300 ossa', isCorrect: false },
          { id: 'l11-q2-a4', text: 'Circa 100 ossa', isCorrect: false }
        ]
      },
      {
        id: 'l11-q3',
        lessonId: 11,
        questionNumber: 3,
        text: 'Quali sono i tipi di ossa?',
        answers: [
          { id: 'l11-q3-a1', text: 'Lunghe, corte, piatte, irregolari', isCorrect: true },
          { id: 'l11-q3-a2', text: 'Solo lunghe e corte', isCorrect: false },
          { id: 'l11-q3-a3', text: 'Solo piatte', isCorrect: false },
          { id: 'l11-q3-a4', text: 'Solo irregolari', isCorrect: false }
        ]
      },
      {
        id: 'l11-q4',
        lessonId: 11,
        questionNumber: 4,
        text: 'Cosa significa articolazione?',
        answers: [
          { id: 'l11-q4-a1', text: 'Punto di connessione tra due o più ossa', isCorrect: true },
          { id: 'l11-q4-a2', text: 'Tipo di osso', isCorrect: false },
          { id: 'l11-q4-a3', text: 'Tipo di muscolo', isCorrect: false },
          { id: 'l11-q4-a4', text: 'Tipo di cartilagine', isCorrect: false }
        ]
      },
      {
        id: 'l11-q5',
        lessonId: 11,
        questionNumber: 5,
        text: 'Quali sono i tipi di articolazioni?',
        answers: [
          { id: 'l11-q5-a1', text: 'Fisse, semimobili, mobili', isCorrect: true },
          { id: 'l11-q5-a2', text: 'Solo fisse e mobili', isCorrect: false },
          { id: 'l11-q5-a3', text: 'Solo mobili', isCorrect: false },
          { id: 'l11-q5-a4', text: 'Solo fisse', isCorrect: false }
        ]
      },
      {
        id: 'l11-q6',
        lessonId: 11,
        questionNumber: 6,
        text: 'Quale è la funzione dei muscoli?',
        answers: [
          { id: 'l11-q6-a1', text: 'Produrre movimento, mantenere postura, generare calore', isCorrect: true },
          { id: 'l11-q6-a2', text: 'Solo produrre movimento', isCorrect: false },
          { id: 'l11-q6-a3', text: 'Solo mantenere postura', isCorrect: false },
          { id: 'l11-q6-a4', text: 'Solo generare calore', isCorrect: false }
        ]
      },
      {
        id: 'l11-q7',
        lessonId: 11,
        questionNumber: 7,
        text: 'Quali sono i tipi di muscoli?',
        answers: [
          { id: 'l11-q7-a1', text: 'Scheletrici, lisci, cardiaco', isCorrect: true },
          { id: 'l11-q7-a2', text: 'Solo scheletrici e lisci', isCorrect: false },
          { id: 'l11-q7-a3', text: 'Solo scheletrici', isCorrect: false },
          { id: 'l11-q7-a4', text: 'Solo lisci', isCorrect: false }
        ]
      },
      {
        id: 'l11-q8',
        lessonId: 11,
        questionNumber: 8,
        text: 'Cosa significa frattura?',
        answers: [
          { id: 'l11-q8-a1', text: 'Rottura di un osso', isCorrect: true },
          { id: 'l11-q8-a2', text: 'Lussazione', isCorrect: false },
          { id: 'l11-q8-a3', text: 'Contusione', isCorrect: false },
          { id: 'l11-q8-a4', text: 'Distorsione', isCorrect: false }
        ]
      },
      {
        id: 'l11-q9',
        lessonId: 11,
        questionNumber: 9,
        text: 'Cosa significa lussazione?',
        answers: [
          { id: 'l11-q9-a1', text: 'Spostamento permanente delle superfici articolari', isCorrect: true },
          { id: 'l11-q9-a2', text: 'Rottura di un osso', isCorrect: false },
          { id: 'l11-q9-a3', text: 'Contusione', isCorrect: false },
          { id: 'l11-q9-a4', text: 'Distorsione', isCorrect: false }
        ]
      },
      {
        id: 'l11-q10',
        lessonId: 11,
        questionNumber: 10,
        text: 'Cosa significa distorsione?',
        answers: [
          { id: 'l11-q10-a1', text: 'Lesione dei legamenti articolari', isCorrect: true },
          { id: 'l11-q10-a2', text: 'Rottura di un osso', isCorrect: false },
          { id: 'l11-q10-a3', text: 'Lussazione', isCorrect: false },
          { id: 'l11-q10-a4', text: 'Contusione', isCorrect: false }
        ]
      },
      {
        id: 'l11-q11',
        lessonId: 11,
        questionNumber: 11,
        text: 'Quale è la funzione della colonna vertebrale?',
        answers: [
          { id: 'l11-q11-a1', text: 'Sostegno, protezione del midollo spinale, movimento', isCorrect: true },
          { id: 'l11-q11-a2', text: 'Solo sostegno', isCorrect: false },
          { id: 'l11-q11-a3', text: 'Solo protezione', isCorrect: false },
          { id: 'l11-q11-a4', text: 'Solo movimento', isCorrect: false }
        ]
      },
      {
        id: 'l11-q12',
        lessonId: 11,
        questionNumber: 12,
        text: 'Quante vertebre ha la colonna vertebrale?',
        answers: [
          { id: 'l11-q12-a1', text: '33-34 vertebre', isCorrect: true },
          { id: 'l11-q12-a2', text: '24 vertebre', isCorrect: false },
          { id: 'l11-q12-a3', text: '40 vertebre', isCorrect: false },
          { id: 'l11-q12-a4', text: '50 vertebre', isCorrect: false }
        ]
      },
      {
        id: 'l11-q13',
        lessonId: 11,
        questionNumber: 13,
        text: 'Cosa significa osteoporosi?',
        answers: [
          { id: 'l11-q13-a1', text: 'Riduzione della densità ossea', isCorrect: true },
          { id: 'l11-q13-a2', text: 'Aumento della densità ossea', isCorrect: false },
          { id: 'l11-q13-a3', text: 'Infiammazione delle ossa', isCorrect: false },
          { id: 'l11-q13-a4', text: 'Rigidità delle articolazioni', isCorrect: false }
        ]
      },
      {
        id: 'l11-q14',
        lessonId: 11,
        questionNumber: 14,
        text: 'Cosa significa artrite?',
        answers: [
          { id: 'l11-q14-a1', text: 'Infiammazione delle articolazioni', isCorrect: true },
          { id: 'l11-q14-a2', text: 'Riduzione della densità ossea', isCorrect: false },
          { id: 'l11-q14-a3', text: 'Rigidità muscolare', isCorrect: false },
          { id: 'l11-q14-a4', text: 'Rottura ossea', isCorrect: false }
        ]
      },
      {
        id: 'l11-q15',
        lessonId: 11,
        questionNumber: 15,
        text: 'Quale è la funzione della cartilagine?',
        answers: [
          { id: 'l11-q15-a1', text: 'Ridurre l\'attrito e ammortizzare le articolazioni', isCorrect: true },
          { id: 'l11-q15-a2', text: 'Solo ridurre l\'attrito', isCorrect: false },
          { id: 'l11-q15-a3', text: 'Solo ammortizzare', isCorrect: false },
          { id: 'l11-q15-a4', text: 'Solo sostenere', isCorrect: false }
        ]
      },
      {
        id: 'l11-q16',
        lessonId: 11,
        questionNumber: 16,
        text: 'Cosa significa contrattura muscolare?',
        answers: [
          { id: 'l11-q16-a1', text: 'Contrazione involontaria e dolorosa del muscolo', isCorrect: true },
          { id: 'l11-q16-a2', text: 'Rilassamento muscolare', isCorrect: false },
          { id: 'l11-q16-a3', text: 'Rottura muscolare', isCorrect: false },
          { id: 'l11-q16-a4', text: 'Infiammazione muscolare', isCorrect: false }
        ]
      },
      {
        id: 'l11-q17',
        lessonId: 11,
        questionNumber: 17,
        text: 'Quale è la funzione dei tendini?',
        answers: [
          { id: 'l11-q17-a1', text: 'Collegare i muscoli alle ossa', isCorrect: true },
          { id: 'l11-q17-a2', text: 'Collegare le ossa tra loro', isCorrect: false },
          { id: 'l11-q17-a3', text: 'Proteggere le articolazioni', isCorrect: false },
          { id: 'l11-q17-a4', text: 'Produrre movimento', isCorrect: false }
        ]
      },
      {
        id: 'l11-q18',
        lessonId: 11,
        questionNumber: 18,
        text: 'Quale è la funzione dei legamenti?',
        answers: [
          { id: 'l11-q18-a1', text: 'Collegare le ossa tra loro nelle articolazioni', isCorrect: true },
          { id: 'l11-q18-a2', text: 'Collegare i muscoli alle ossa', isCorrect: false },
          { id: 'l11-q18-a3', text: 'Proteggere i muscoli', isCorrect: false },
          { id: 'l11-q18-a4', text: 'Produrre movimento', isCorrect: false }
        ]
      },
      {
        id: 'l11-q19',
        lessonId: 11,
        questionNumber: 19,
        text: 'Cosa significa atrofia muscolare?',
        answers: [
          { id: 'l11-q19-a1', text: 'Riduzione della massa muscolare', isCorrect: true },
          { id: 'l11-q19-a2', text: 'Aumento della massa muscolare', isCorrect: false },
          { id: 'l11-q19-a3', text: 'Infiammazione muscolare', isCorrect: false },
          { id: 'l11-q19-a4', text: 'Rigidità muscolare', isCorrect: false }
        ]
      },
      {
        id: 'l11-q20',
        lessonId: 11,
        questionNumber: 20,
        text: 'Quale è la funzione del midollo osseo?',
        answers: [
          { id: 'l11-q20-a1', text: 'Produrre cellule del sangue', isCorrect: true },
          { id: 'l11-q20-a2', text: 'Solo sostenere le ossa', isCorrect: false },
          { id: 'l11-q20-a3', text: 'Solo proteggere gli organi', isCorrect: false },
          { id: 'l11-q20-a4', text: 'Solo produrre movimento', isCorrect: false }
        ]
      }
    ];
  }

  private createVitalSignsQuestions(): Question[] {
    return [
      {
        id: 'l12-q1',
        lessonId: 12,
        questionNumber: 1,
        text: 'Quali sono i parametri vitali principali?',
        answers: [
          { id: 'l12-q1-a1', text: 'Pressione arteriosa, frequenza cardiaca, frequenza respiratoria, temperatura, SpO2', isCorrect: true },
          { id: 'l12-q1-a2', text: 'Solo pressione e frequenza cardiaca', isCorrect: false },
          { id: 'l12-q1-a3', text: 'Solo temperatura', isCorrect: false },
          { id: 'l12-q1-a4', text: 'Solo SpO2', isCorrect: false }
        ]
      },
      {
        id: 'l12-q2',
        lessonId: 12,
        questionNumber: 2,
        text: 'Quale è la pressione arteriosa normale?',
        answers: [
          { id: 'l12-q2-a1', text: '120/80 mmHg', isCorrect: true },
          { id: 'l12-q2-a2', text: '100/60 mmHg', isCorrect: false },
          { id: 'l12-q2-a3', text: '140/90 mmHg', isCorrect: false },
          { id: 'l12-q2-a4', text: '160/100 mmHg', isCorrect: false }
        ]
      },
      {
        id: 'l12-q3',
        lessonId: 12,
        questionNumber: 3,
        text: 'Quale è la frequenza cardiaca normale a riposo?',
        answers: [
          { id: 'l12-q3-a1', text: '60-100 battiti/minuto', isCorrect: true },
          { id: 'l12-q3-a2', text: '40-60 battiti/minuto', isCorrect: false },
          { id: 'l12-q3-a3', text: '100-120 battiti/minuto', isCorrect: false },
          { id: 'l12-q3-a4', text: '120-150 battiti/minuto', isCorrect: false }
        ]
      },
      {
        id: 'l12-q4',
        lessonId: 12,
        questionNumber: 4,
        text: 'Quale è la frequenza respiratoria normale?',
        answers: [
          { id: 'l12-q4-a1', text: '12-20 atti/minuto', isCorrect: true },
          { id: 'l12-q4-a2', text: '8-12 atti/minuto', isCorrect: false },
          { id: 'l12-q4-a3', text: '20-30 atti/minuto', isCorrect: false },
          { id: 'l12-q4-a4', text: '30-40 atti/minuto', isCorrect: false }
        ]
      },
      {
        id: 'l12-q5',
        lessonId: 12,
        questionNumber: 5,
        text: 'Quale è la temperatura corporea normale?',
        answers: [
          { id: 'l12-q5-a1', text: '36,5-37,5°C', isCorrect: true },
          { id: 'l12-q5-a2', text: '35-36°C', isCorrect: false },
          { id: 'l12-q5-a3', text: '38-39°C', isCorrect: false },
          { id: 'l12-q5-a4', text: '37,5-38,5°C', isCorrect: false }
        ]
      },
      {
        id: 'l12-q6',
        lessonId: 12,
        questionNumber: 6,
        text: 'Quale è la saturazione di ossigeno normale?',
        answers: [
          { id: 'l12-q6-a1', text: '95-100%', isCorrect: true },
          { id: 'l12-q6-a2', text: '85-90%', isCorrect: false },
          { id: 'l12-q6-a3', text: '90-95%', isCorrect: false },
          { id: 'l12-q6-a4', text: '100-105%', isCorrect: false }
        ]
      },
      {
        id: 'l12-q7',
        lessonId: 12,
        questionNumber: 7,
        text: 'Cosa significa ipertensione?',
        answers: [
          { id: 'l12-q7-a1', text: 'Pressione arteriosa elevata', isCorrect: true },
          { id: 'l12-q7-a2', text: 'Pressione arteriosa bassa', isCorrect: false },
          { id: 'l12-q7-a3', text: 'Pressione arteriosa normale', isCorrect: false },
          { id: 'l12-q7-a4', text: 'Pressione arteriosa irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q8',
        lessonId: 12,
        questionNumber: 8,
        text: 'Cosa significa ipotensione?',
        answers: [
          { id: 'l12-q8-a1', text: 'Pressione arteriosa bassa', isCorrect: true },
          { id: 'l12-q8-a2', text: 'Pressione arteriosa elevata', isCorrect: false },
          { id: 'l12-q8-a3', text: 'Pressione arteriosa normale', isCorrect: false },
          { id: 'l12-q8-a4', text: 'Pressione arteriosa irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q9',
        lessonId: 12,
        questionNumber: 9,
        text: 'Cosa significa febbre?',
        answers: [
          { id: 'l12-q9-a1', text: 'Temperatura corporea superiore a 37,5°C', isCorrect: true },
          { id: 'l12-q9-a2', text: 'Temperatura corporea inferiore a 36°C', isCorrect: false },
          { id: 'l12-q9-a3', text: 'Temperatura corporea normale', isCorrect: false },
          { id: 'l12-q9-a4', text: 'Temperatura corporea irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q10',
        lessonId: 12,
        questionNumber: 10,
        text: 'Cosa significa ipotermia?',
        answers: [
          { id: 'l12-q10-a1', text: 'Temperatura corporea inferiore a 35°C', isCorrect: true },
          { id: 'l12-q10-a2', text: 'Temperatura corporea superiore a 38°C', isCorrect: false },
          { id: 'l12-q10-a3', text: 'Temperatura corporea normale', isCorrect: false },
          { id: 'l12-q10-a4', text: 'Temperatura corporea irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q11',
        lessonId: 12,
        questionNumber: 11,
        text: 'Cosa significa tachicardia?',
        answers: [
          { id: 'l12-q11-a1', text: 'Frequenza cardiaca superiore a 100 bpm', isCorrect: true },
          { id: 'l12-q11-a2', text: 'Frequenza cardiaca inferiore a 60 bpm', isCorrect: false },
          { id: 'l12-q11-a3', text: 'Frequenza cardiaca normale', isCorrect: false },
          { id: 'l12-q11-a4', text: 'Frequenza cardiaca irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q12',
        lessonId: 12,
        questionNumber: 12,
        text: 'Cosa significa bradicardia?',
        answers: [
          { id: 'l12-q12-a1', text: 'Frequenza cardiaca inferiore a 60 bpm', isCorrect: true },
          { id: 'l12-q12-a2', text: 'Frequenza cardiaca superiore a 100 bpm', isCorrect: false },
          { id: 'l12-q12-a3', text: 'Frequenza cardiaca normale', isCorrect: false },
          { id: 'l12-q12-a4', text: 'Frequenza cardiaca irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q13',
        lessonId: 12,
        questionNumber: 13,
        text: 'Cosa significa tachipnea?',
        answers: [
          { id: 'l12-q13-a1', text: 'Frequenza respiratoria superiore a 20 atti/minuto', isCorrect: true },
          { id: 'l12-q13-a2', text: 'Frequenza respiratoria inferiore a 12 atti/minuto', isCorrect: false },
          { id: 'l12-q13-a3', text: 'Frequenza respiratoria normale', isCorrect: false },
          { id: 'l12-q13-a4', text: 'Frequenza respiratoria irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q14',
        lessonId: 12,
        questionNumber: 14,
        text: 'Cosa significa bradipnea?',
        answers: [
          { id: 'l12-q14-a1', text: 'Frequenza respiratoria inferiore a 12 atti/minuto', isCorrect: true },
          { id: 'l12-q14-a2', text: 'Frequenza respiratoria superiore a 20 atti/minuto', isCorrect: false },
          { id: 'l12-q14-a3', text: 'Frequenza respiratoria normale', isCorrect: false },
          { id: 'l12-q14-a4', text: 'Frequenza respiratoria irregolare', isCorrect: false }
        ]
      },
      {
        id: 'l12-q15',
        lessonId: 12,
        questionNumber: 15,
        text: 'Cosa significa ipossia?',
        answers: [
          { id: 'l12-q15-a1', text: 'Carenza di ossigeno nei tessuti', isCorrect: true },
          { id: 'l12-q15-a2', text: 'Eccesso di ossigeno', isCorrect: false },
          { id: 'l12-q15-a3', text: 'Ossigeno normale', isCorrect: false },
          { id: 'l12-q15-a4', text: 'Carenza di anidride carbonica', isCorrect: false }
        ]
      },
      {
        id: 'l12-q16',
        lessonId: 12,
        questionNumber: 16,
        text: 'Quale strumento si usa per misurare la pressione arteriosa?',
        answers: [
          { id: 'l12-q16-a1', text: 'Sfigmomanometro', isCorrect: true },
          { id: 'l12-q16-a2', text: 'Termometro', isCorrect: false },
          { id: 'l12-q16-a3', text: 'Pulsossimetro', isCorrect: false },
          { id: 'l12-q16-a4', text: 'Stetoscopio', isCorrect: false }
        ]
      },
      {
        id: 'l12-q17',
        lessonId: 12,
        questionNumber: 17,
        text: 'Quale strumento si usa per misurare la saturazione di ossigeno?',
        answers: [
          { id: 'l12-q17-a1', text: 'Pulsossimetro', isCorrect: true },
          { id: 'l12-q17-a2', text: 'Sfigmomanometro', isCorrect: false },
          { id: 'l12-q17-a3', text: 'Termometro', isCorrect: false },
          { id: 'l12-q17-a4', text: 'Stetoscopio', isCorrect: false }
        ]
      },
      {
        id: 'l12-q18',
        lessonId: 12,
        questionNumber: 18,
        text: 'Cosa significa dolore?',
        answers: [
          { id: 'l12-q18-a1', text: 'Esperienza sensoriale ed emotiva spiacevole', isCorrect: true },
          { id: 'l12-q18-a2', text: 'Solo sensazione fisica', isCorrect: false },
          { id: 'l12-q18-a3', text: 'Solo emozione', isCorrect: false },
          { id: 'l12-q18-a4', text: 'Sintomo non importante', isCorrect: false }
        ]
      },
      {
        id: 'l12-q19',
        lessonId: 12,
        questionNumber: 19,
        text: 'Quale è la glicemia normale a digiuno?',
        answers: [
          { id: 'l12-q19-a1', text: '70-100 mg/dl', isCorrect: true },
          { id: 'l12-q19-a2', text: '50-70 mg/dl', isCorrect: false },
          { id: 'l12-q19-a3', text: '100-150 mg/dl', isCorrect: false },
          { id: 'l12-q19-a4', text: '150-200 mg/dl', isCorrect: false }
        ]
      },
      {
        id: 'l12-q20',
        lessonId: 12,
        questionNumber: 20,
        text: 'Quando si misura la pressione arteriosa?',
        answers: [
          { id: 'l12-q20-a1', text: 'A riposo, in posizione seduta o sdraiata', isCorrect: true },
          { id: 'l12-q20-a2', text: 'Solo dopo attività fisica', isCorrect: false },
          { id: 'l12-q20-a3', text: 'Solo in piedi', isCorrect: false },
          { id: 'l12-q20-a4', text: 'In qualsiasi momento', isCorrect: false }
        ]
      }
    ];
  }

  private createPharmacologyQuestions(): Question[] {
    return [
      {
        id: 'l13-q1',
        lessonId: 13,
        questionNumber: 1,
        text: 'Quale è la regola fondamentale per la somministrazione di farmaci?',
        answers: [
          { id: 'l13-q1-a1', text: 'Le 5 giuste: paziente, farmaco, dose, via, tempo', isCorrect: true },
          { id: 'l13-q1-a2', text: 'Solo verificare il paziente', isCorrect: false },
          { id: 'l13-q1-a3', text: 'Solo verificare il farmaco', isCorrect: false },
          { id: 'l13-q1-a4', text: 'Solo verificare la dose', isCorrect: false }
        ]
      },
      {
        id: 'l13-q2',
        lessonId: 13,
        questionNumber: 2,
        text: 'L\'OSS può somministrare farmaci?',
        answers: [
          { id: 'l13-q2-a1', text: 'Solo se autorizzato e sotto supervisione', isCorrect: true },
          { id: 'l13-q2-a2', text: 'Sempre in autonomia', isCorrect: false },
          { id: 'l13-q2-a3', text: 'Mai', isCorrect: false },
          { id: 'l13-q2-a4', text: 'Solo farmaci da banco', isCorrect: false }
        ]
      },
      {
        id: 'l13-q3',
        lessonId: 13,
        questionNumber: 3,
        text: 'Quali sono le vie di somministrazione dei farmaci?',
        answers: [
          { id: 'l13-q3-a1', text: 'Orale, parenterale, topica, inalatoria, rettale', isCorrect: true },
          { id: 'l13-q3-a2', text: 'Solo orale e parenterale', isCorrect: false },
          { id: 'l13-q3-a3', text: 'Solo orale', isCorrect: false },
          { id: 'l13-q3-a4', text: 'Solo parenterale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q4',
        lessonId: 13,
        questionNumber: 4,
        text: 'Cosa significa via orale?',
        answers: [
          { id: 'l13-q4-a1', text: 'Somministrazione attraverso la bocca', isCorrect: true },
          { id: 'l13-q4-a2', text: 'Somministrazione per iniezione', isCorrect: false },
          { id: 'l13-q4-a3', text: 'Somministrazione sulla pelle', isCorrect: false },
          { id: 'l13-q4-a4', text: 'Somministrazione per via rettale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q5',
        lessonId: 13,
        questionNumber: 5,
        text: 'Cosa significa via parenterale?',
        answers: [
          { id: 'l13-q5-a1', text: 'Somministrazione per iniezione (endovenosa, intramuscolare, sottocutanea)', isCorrect: true },
          { id: 'l13-q5-a2', text: 'Somministrazione attraverso la bocca', isCorrect: false },
          { id: 'l13-q5-a3', text: 'Somministrazione sulla pelle', isCorrect: false },
          { id: 'l13-q5-a4', text: 'Somministrazione per via rettale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q6',
        lessonId: 13,
        questionNumber: 6,
        text: 'Cosa significa allergia a un farmaco?',
        answers: [
          { id: 'l13-q6-a1', text: 'Reazione immunitaria avversa a un farmaco', isCorrect: true },
          { id: 'l13-q6-a2', text: 'Effetto terapeutico del farmaco', isCorrect: false },
          { id: 'l13-q6-a3', text: 'Tolleranza al farmaco', isCorrect: false },
          { id: 'l13-q6-a4', text: 'Dipendenza dal farmaco', isCorrect: false }
        ]
      },
      {
        id: 'l13-q7',
        lessonId: 13,
        questionNumber: 7,
        text: 'Cosa significa interazione farmacologica?',
        answers: [
          { id: 'l13-q7-a1', text: 'Modificazione dell\'effetto di un farmaco da parte di un altro', isCorrect: true },
          { id: 'l13-q7-a2', text: 'Allergia a un farmaco', isCorrect: false },
          { id: 'l13-q7-a3', text: 'Effetto terapeutico', isCorrect: false },
          { id: 'l13-q7-a4', text: 'Tolleranza', isCorrect: false }
        ]
      },
      {
        id: 'l13-q8',
        lessonId: 13,
        questionNumber: 8,
        text: 'Cosa significa dose?',
        answers: [
          { id: 'l13-q8-a1', text: 'Quantità di farmaco da somministrare', isCorrect: true },
          { id: 'l13-q8-a2', text: 'Via di somministrazione', isCorrect: false },
          { id: 'l13-q8-a3', text: 'Frequenza di somministrazione', isCorrect: false },
          { id: 'l13-q8-a4', text: 'Tipo di farmaco', isCorrect: false }
        ]
      },
      {
        id: 'l13-q9',
        lessonId: 13,
        questionNumber: 9,
        text: 'Cosa significa posologia?',
        answers: [
          { id: 'l13-q9-a1', text: 'Modalità di somministrazione del farmaco (dose, frequenza, durata)', isCorrect: true },
          { id: 'l13-q9-a2', text: 'Solo la dose', isCorrect: false },
          { id: 'l13-q9-a3', text: 'Solo la frequenza', isCorrect: false },
          { id: 'l13-q9-a4', text: 'Solo la via di somministrazione', isCorrect: false }
        ]
      },
      {
        id: 'l13-q10',
        lessonId: 13,
        questionNumber: 10,
        text: 'Cosa significa effetti collaterali?',
        answers: [
          { id: 'l13-q10-a1', text: 'Effetti indesiderati del farmaco', isCorrect: true },
          { id: 'l13-q10-a2', text: 'Effetti terapeutici', isCorrect: false },
          { id: 'l13-q10-a3', text: 'Allergie', isCorrect: false },
          { id: 'l13-q10-a4', text: 'Interazioni', isCorrect: false }
        ]
      },
      {
        id: 'l13-q11',
        lessonId: 13,
        questionNumber: 11,
        text: 'Cosa significa via endovenosa?',
        answers: [
          { id: 'l13-q11-a1', text: 'Somministrazione direttamente in vena', isCorrect: true },
          { id: 'l13-q11-a2', text: 'Somministrazione nel muscolo', isCorrect: false },
          { id: 'l13-q11-a3', text: 'Somministrazione sottocutanea', isCorrect: false },
          { id: 'l13-q11-a4', text: 'Somministrazione orale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q12',
        lessonId: 13,
        questionNumber: 12,
        text: 'Cosa significa via intramuscolare?',
        answers: [
          { id: 'l13-q12-a1', text: 'Somministrazione nel muscolo', isCorrect: true },
          { id: 'l13-q12-a2', text: 'Somministrazione in vena', isCorrect: false },
          { id: 'l13-q12-a3', text: 'Somministrazione sottocutanea', isCorrect: false },
          { id: 'l13-q12-a4', text: 'Somministrazione orale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q13',
        lessonId: 13,
        questionNumber: 13,
        text: 'Cosa significa via sottocutanea?',
        answers: [
          { id: 'l13-q13-a1', text: 'Somministrazione sotto la pelle', isCorrect: true },
          { id: 'l13-q13-a2', text: 'Somministrazione in vena', isCorrect: false },
          { id: 'l13-q13-a3', text: 'Somministrazione nel muscolo', isCorrect: false },
          { id: 'l13-q13-a4', text: 'Somministrazione orale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q14',
        lessonId: 13,
        questionNumber: 14,
        text: 'Cosa significa via topica?',
        answers: [
          { id: 'l13-q14-a1', text: 'Somministrazione sulla superficie corporea', isCorrect: true },
          { id: 'l13-q14-a2', text: 'Somministrazione orale', isCorrect: false },
          { id: 'l13-q14-a3', text: 'Somministrazione per iniezione', isCorrect: false },
          { id: 'l13-q14-a4', text: 'Somministrazione rettale', isCorrect: false }
        ]
      },
      {
        id: 'l13-q15',
        lessonId: 13,
        questionNumber: 15,
        text: 'Cosa significa via rettale?',
        answers: [
          { id: 'l13-q15-a1', text: 'Somministrazione attraverso il retto', isCorrect: true },
          { id: 'l13-q15-a2', text: 'Somministrazione orale', isCorrect: false },
          { id: 'l13-q15-a3', text: 'Somministrazione per iniezione', isCorrect: false },
          { id: 'l13-q15-a4', text: 'Somministrazione topica', isCorrect: false }
        ]
      },
      {
        id: 'l13-q16',
        lessonId: 13,
        questionNumber: 16,
        text: 'Cosa significa via inalatoria?',
        answers: [
          { id: 'l13-q16-a1', text: 'Somministrazione attraverso le vie respiratorie', isCorrect: true },
          { id: 'l13-q16-a2', text: 'Somministrazione orale', isCorrect: false },
          { id: 'l13-q16-a3', text: 'Somministrazione per iniezione', isCorrect: false },
          { id: 'l13-q16-a4', text: 'Somministrazione topica', isCorrect: false }
        ]
      },
      {
        id: 'l13-q17',
        lessonId: 13,
        questionNumber: 17,
        text: 'Cosa significa farmaco generico?',
        answers: [
          { id: 'l13-q17-a1', text: 'Farmaco equivalente al farmaco di marca', isCorrect: true },
          { id: 'l13-q17-a2', text: 'Farmaco diverso', isCorrect: false },
          { id: 'l13-q17-a3', text: 'Farmaco più potente', isCorrect: false },
          { id: 'l13-q17-a4', text: 'Farmaco meno efficace', isCorrect: false }
        ]
      },
      {
        id: 'l13-q18',
        lessonId: 13,
        questionNumber: 18,
        text: 'Cosa significa principio attivo?',
        answers: [
          { id: 'l13-q18-a1', text: 'Sostanza responsabile dell\'effetto terapeutico', isCorrect: true },
          { id: 'l13-q18-a2', text: 'Sostanza inattiva', isCorrect: false },
          { id: 'l13-q18-a3', text: 'Eccipiente', isCorrect: false },
          { id: 'l13-q18-a4', text: 'Additivo', isCorrect: false }
        ]
      },
      {
        id: 'l13-q19',
        lessonId: 13,
        questionNumber: 19,
        text: 'Cosa significa conservazione dei farmaci?',
        answers: [
          { id: 'l13-q19-a1', text: 'Mantenere i farmaci in condizioni appropriate (temperatura, umidità, luce)', isCorrect: true },
          { id: 'l13-q19-a2', text: 'Solo temperatura', isCorrect: false },
          { id: 'l13-q19-a3', text: 'Solo umidità', isCorrect: false },
          { id: 'l13-q19-a4', text: 'Nessuna precauzione necessaria', isCorrect: false }
        ]
      },
      {
        id: 'l13-q20',
        lessonId: 13,
        questionNumber: 20,
        text: 'Cosa significa scadenza di un farmaco?',
        answers: [
          { id: 'l13-q20-a1', text: 'Data oltre la quale il farmaco non deve essere utilizzato', isCorrect: true },
          { id: 'l13-q20-a2', text: 'Data di produzione', isCorrect: false },
          { id: 'l13-q20-a3', text: 'Data di prescrizione', isCorrect: false },
          { id: 'l13-q20-a4', text: 'Data di apertura', isCorrect: false }
        ]
      }
    ];
  }

  private createNutritionQuestions(): Question[] {
    return [
      {
        id: 'l14-q1',
        lessonId: 14,
        questionNumber: 1,
        text: 'Quali sono i macronutrienti?',
        answers: [
          { id: 'l14-q1-a1', text: 'Carboidrati, proteine, lipidi', isCorrect: true },
          { id: 'l14-q1-a2', text: 'Solo carboidrati', isCorrect: false },
          { id: 'l14-q1-a3', text: 'Solo proteine', isCorrect: false },
          { id: 'l14-q1-a4', text: 'Solo vitamine', isCorrect: false }
        ]
      },
      {
        id: 'l14-q2',
        lessonId: 14,
        questionNumber: 2,
        text: 'Quali sono i micronutrienti?',
        answers: [
          { id: 'l14-q2-a1', text: 'Vitamine e minerali', isCorrect: true },
          { id: 'l14-q2-a2', text: 'Solo vitamine', isCorrect: false },
          { id: 'l14-q2-a3', text: 'Solo minerali', isCorrect: false },
          { id: 'l14-q2-a4', text: 'Carboidrati e proteine', isCorrect: false }
        ]
      },
      {
        id: 'l14-q3',
        lessonId: 14,
        questionNumber: 3,
        text: 'Quale è il fabbisogno idrico giornaliero medio?',
        answers: [
          { id: 'l14-q3-a1', text: 'Circa 1,5-2 litri', isCorrect: true },
          { id: 'l14-q3-a2', text: 'Circa 1 litro', isCorrect: false },
          { id: 'l14-q3-a3', text: 'Circa 3 litri', isCorrect: false },
          { id: 'l14-q3-a4', text: 'Circa 4 litri', isCorrect: false }
        ]
      },
      {
        id: 'l14-q4',
        lessonId: 14,
        questionNumber: 4,
        text: 'Cosa significa nutrizione enterale?',
        answers: [
          { id: 'l14-q4-a1', text: 'Nutrizione attraverso il tratto gastrointestinale', isCorrect: true },
          { id: 'l14-q4-a2', text: 'Nutrizione per via endovenosa', isCorrect: false },
          { id: 'l14-q4-a3', text: 'Nutrizione orale normale', isCorrect: false },
          { id: 'l14-q4-a4', text: 'Nutrizione parenterale', isCorrect: false }
        ]
      },
      {
        id: 'l14-q5',
        lessonId: 14,
        questionNumber: 5,
        text: 'Cosa significa nutrizione parenterale?',
        answers: [
          { id: 'l14-q5-a1', text: 'Nutrizione per via endovenosa', isCorrect: true },
          { id: 'l14-q5-a2', text: 'Nutrizione attraverso il tratto gastrointestinale', isCorrect: false },
          { id: 'l14-q5-a3', text: 'Nutrizione orale normale', isCorrect: false },
          { id: 'l14-q5-a4', text: 'Nutrizione enterale', isCorrect: false }
        ]
      },
      {
        id: 'l14-q6',
        lessonId: 14,
        questionNumber: 6,
        text: 'Cosa significa SNG?',
        answers: [
          { id: 'l14-q6-a1', text: 'Sonda Naso-Gastrica', isCorrect: true },
          { id: 'l14-q6-a2', text: 'Sistema Nutrizionale Generale', isCorrect: false },
          { id: 'l14-q6-a3', text: 'Sonda Nutrizionale Gastrica', isCorrect: false },
          { id: 'l14-q6-a4', text: 'Sistema Nutrizionale Gastrico', isCorrect: false }
        ]
      },
      {
        id: 'l14-q7',
        lessonId: 14,
        questionNumber: 7,
        text: 'Quale è la posizione corretta per la nutrizione enterale?',
        answers: [
          { id: 'l14-q7-a1', text: 'Paziente in posizione semiseduta (30-45°)', isCorrect: true },
          { id: 'l14-q7-a2', text: 'Paziente sdraiato', isCorrect: false },
          { id: 'l14-q7-a3', text: 'Paziente in piedi', isCorrect: false },
          { id: 'l14-q7-a4', text: 'Qualsiasi posizione', isCorrect: false }
        ]
      },
      {
        id: 'l14-q8',
        lessonId: 14,
        questionNumber: 8,
        text: 'Cosa significa PEG?',
        answers: [
          { id: 'l14-q8-a1', text: 'Gastrostomia Endoscopica Percutanea', isCorrect: true },
          { id: 'l14-q8-a2', text: 'Protezione Enterale Gastrica', isCorrect: false },
          { id: 'l14-q8-a3', text: 'Percorso Enterale Gastrico', isCorrect: false },
          { id: 'l14-q8-a4', text: 'Procedura Enterale Gastrica', isCorrect: false }
        ]
      },
      {
        id: 'l14-q9',
        lessonId: 14,
        questionNumber: 9,
        text: 'Cosa significa disfagia?',
        answers: [
          { id: 'l14-q9-a1', text: 'Difficoltà a deglutire', isCorrect: true },
          { id: 'l14-q9-a2', text: 'Difficoltà a digerire', isCorrect: false },
          { id: 'l14-q9-a3', text: 'Difficoltà ad assorbire', isCorrect: false },
          { id: 'l14-q9-a4', text: 'Difficoltà ad eliminare', isCorrect: false }
        ]
      },
      {
        id: 'l14-q10',
        lessonId: 14,
        questionNumber: 10,
        text: 'Quale è la dieta iposodica?',
        answers: [
          { id: 'l14-q10-a1', text: 'Dieta con ridotto contenuto di sodio', isCorrect: true },
          { id: 'l14-q10-a2', text: 'Dieta con elevato contenuto di sodio', isCorrect: false },
          { id: 'l14-q10-a3', text: 'Dieta senza carboidrati', isCorrect: false },
          { id: 'l14-q10-a4', text: 'Dieta senza proteine', isCorrect: false }
        ]
      },
      {
        id: 'l14-q11',
        lessonId: 14,
        questionNumber: 11,
        text: 'Quale è la dieta ipoglucidica?',
        answers: [
          { id: 'l14-q11-a1', text: 'Dieta con ridotto contenuto di carboidrati', isCorrect: true },
          { id: 'l14-q11-a2', text: 'Dieta con elevato contenuto di carboidrati', isCorrect: false },
          { id: 'l14-q11-a3', text: 'Dieta senza sodio', isCorrect: false },
          { id: 'l14-q11-a4', text: 'Dieta senza proteine', isCorrect: false }
        ]
      },
      {
        id: 'l14-q12',
        lessonId: 14,
        questionNumber: 12,
        text: 'Quale è la dieta iperproteica?',
        answers: [
          { id: 'l14-q12-a1', text: 'Dieta con elevato contenuto di proteine', isCorrect: true },
          { id: 'l14-q12-a2', text: 'Dieta con ridotto contenuto di proteine', isCorrect: false },
          { id: 'l14-q12-a3', text: 'Dieta senza proteine', isCorrect: false },
          { id: 'l14-q12-a4', text: 'Dieta senza carboidrati', isCorrect: false }
        ]
      },
      {
        id: 'l14-q13',
        lessonId: 14,
        questionNumber: 13,
        text: 'Cosa significa malnutrizione?',
        answers: [
          { id: 'l14-q13-a1', text: 'Stato nutrizionale alterato per carenza o eccesso', isCorrect: true },
          { id: 'l14-q13-a2', text: 'Solo carenza nutrizionale', isCorrect: false },
          { id: 'l14-q13-a3', text: 'Solo eccesso nutrizionale', isCorrect: false },
          { id: 'l14-q13-a4', text: 'Stato nutrizionale normale', isCorrect: false }
        ]
      },
      {
        id: 'l14-q14',
        lessonId: 14,
        questionNumber: 14,
        text: 'Cosa significa BMI?',
        answers: [
          { id: 'l14-q14-a1', text: 'Indice di Massa Corporea', isCorrect: true },
          { id: 'l14-q14-a2', text: 'Indice di Massa Calorica', isCorrect: false },
          { id: 'l14-q14-a3', text: 'Indice di Massa Nutrizionale', isCorrect: false },
          { id: 'l14-q14-a4', text: 'Indice di Massa Proteica', isCorrect: false }
        ]
      },
      {
        id: 'l14-q15',
        lessonId: 14,
        questionNumber: 15,
        text: 'Quale è il BMI normale?',
        answers: [
          { id: 'l14-q15-a1', text: '18,5-24,9', isCorrect: true },
          { id: 'l14-q15-a2', text: '15-18,5', isCorrect: false },
          { id: 'l14-q15-a3', text: '25-30', isCorrect: false },
          { id: 'l14-q15-a4', text: '30-35', isCorrect: false }
        ]
      },
      {
        id: 'l14-q16',
        lessonId: 14,
        questionNumber: 16,
        text: 'Cosa significa cachessia?',
        answers: [
          { id: 'l14-q16-a1', text: 'Grave deperimento organico e perdita di peso', isCorrect: true },
          { id: 'l14-q16-a2', text: 'Aumento di peso', isCorrect: false },
          { id: 'l14-q16-a3', text: 'Stato nutrizionale normale', isCorrect: false },
          { id: 'l14-q16-a4', text: 'Obesità', isCorrect: false }
        ]
      },
      {
        id: 'l14-q17',
        lessonId: 14,
        questionNumber: 17,
        text: 'Quale è la funzione dell\'OSS nella nutrizione enterale?',
        answers: [
          { id: 'l14-q17-a1', text: 'Preparare, somministrare, monitorare e documentare', isCorrect: true },
          { id: 'l14-q17-a2', text: 'Solo preparare', isCorrect: false },
          { id: 'l14-q17-a3', text: 'Solo somministrare', isCorrect: false },
          { id: 'l14-q17-a4', text: 'Solo monitorare', isCorrect: false }
        ]
      },
      {
        id: 'l14-q18',
        lessonId: 14,
        questionNumber: 18,
        text: 'Cosa significa aspirazione nella nutrizione enterale?',
        answers: [
          { id: 'l14-q18-a1', text: 'Risalita del contenuto gastrico nelle vie aeree', isCorrect: true },
          { id: 'l14-q18-a2', text: 'Riduzione del contenuto gastrico', isCorrect: false },
          { id: 'l14-q18-a3', text: 'Aumento del contenuto gastrico', isCorrect: false },
          { id: 'l14-q18-a4', text: 'Eliminazione del contenuto gastrico', isCorrect: false }
        ]
      },
      {
        id: 'l14-q19',
        lessonId: 14,
        questionNumber: 19,
        text: 'Quale precauzione è importante nella nutrizione enterale?',
        answers: [
          { id: 'l14-q19-a1', text: 'Verificare posizione sonda, residuo gastrico, posizione paziente', isCorrect: true },
          { id: 'l14-q19-a2', text: 'Solo verificare la posizione sonda', isCorrect: false },
          { id: 'l14-q19-a3', text: 'Solo verificare il residuo', isCorrect: false },
          { id: 'l14-q19-a4', text: 'Nessuna precauzione', isCorrect: false }
        ]
      },
      {
        id: 'l14-q20',
        lessonId: 14,
        questionNumber: 20,
        text: 'Cosa significa dieta liquida?',
        answers: [
          { id: 'l14-q20-a1', text: 'Dieta costituita solo da liquidi', isCorrect: true },
          { id: 'l14-q20-a2', text: 'Dieta con cibi solidi', isCorrect: false },
          { id: 'l14-q20-a3', text: 'Dieta con cibi semisolidi', isCorrect: false },
          { id: 'l14-q20-a4', text: 'Dieta normale', isCorrect: false }
        ]
      }
    ];
  }

  private createFirstAidQuestions(): Question[] {
    return [
      {
        id: 'l15-q1',
        lessonId: 15,
        questionNumber: 1,
        text: 'Quale è il numero di emergenza sanitario in Italia?',
        answers: [
          { id: 'l15-q1-a1', text: '118', isCorrect: true },
          { id: 'l15-q1-a2', text: '112', isCorrect: false },
          { id: 'l15-q1-a3', text: '115', isCorrect: false },
          { id: 'l15-q1-a4', text: '113', isCorrect: false }
        ]
      },
      {
        id: 'l15-q2',
        lessonId: 15,
        questionNumber: 2,
        text: 'Cosa significa BLSD?',
        answers: [
          { id: 'l15-q2-a1', text: 'Basic Life Support and Defibrillation', isCorrect: true },
          { id: 'l15-q2-a2', text: 'Basic Life Support and Diagnosis', isCorrect: false },
          { id: 'l15-q2-a3', text: 'Basic Life Support and Disinfection', isCorrect: false },
          { id: 'l15-q2-a4', text: 'Basic Life Support and Documentation', isCorrect: false }
        ]
      },
      {
        id: 'l15-q3',
        lessonId: 15,
        questionNumber: 3,
        text: 'Quale è la sequenza corretta del BLS?',
        answers: [
          { id: 'l15-q3-a1', text: 'Valutazione sicurezza, coscienza, chiamata 118, ABC, RCP', isCorrect: true },
          { id: 'l15-q3-a2', text: 'Solo RCP', isCorrect: false },
          { id: 'l15-q3-a3', text: 'Solo chiamata 118', isCorrect: false },
          { id: 'l15-q3-a4', text: 'Solo ABC', isCorrect: false }
        ]
      },
      {
        id: 'l15-q4',
        lessonId: 15,
        questionNumber: 4,
        text: 'Cosa significa ABC?',
        answers: [
          { id: 'l15-q4-a1', text: 'Airway (vie aeree), Breathing (respirazione), Circulation (circolazione)', isCorrect: true },
          { id: 'l15-q4-a2', text: 'Solo Airway', isCorrect: false },
          { id: 'l15-q4-a3', text: 'Solo Breathing', isCorrect: false },
          { id: 'l15-q4-a4', text: 'Solo Circulation', isCorrect: false }
        ]
      },
      {
        id: 'l15-q5',
        lessonId: 15,
        questionNumber: 5,
        text: 'Quale è la frequenza delle compressioni toraciche nella RCP?',
        answers: [
          { id: 'l15-q5-a1', text: '100-120 compressioni/minuto', isCorrect: true },
          { id: 'l15-q5-a2', text: '60-80 compressioni/minuto', isCorrect: false },
          { id: 'l15-q5-a3', text: '80-100 compressioni/minuto', isCorrect: false },
          { id: 'l15-q5-a4', text: '120-150 compressioni/minuto', isCorrect: false }
        ]
      },
      {
        id: 'l15-q6',
        lessonId: 15,
        questionNumber: 6,
        text: 'Quale è il rapporto compressioni-ventilazioni nella RCP?',
        answers: [
          { id: 'l15-q6-a1', text: '30:2', isCorrect: true },
          { id: 'l15-q6-a2', text: '15:2', isCorrect: false },
          { id: 'l15-q6-a3', text: '30:1', isCorrect: false },
          { id: 'l15-q6-a4', text: '20:2', isCorrect: false }
        ]
      },
      {
        id: 'l15-q7',
        lessonId: 15,
        questionNumber: 7,
        text: 'Cosa significa triage?',
        answers: [
          { id: 'l15-q7-a1', text: 'Valutazione prioritaria dei pazienti in emergenza', isCorrect: true },
          { id: 'l15-q7-a2', text: 'Trattamento immediato', isCorrect: false },
          { id: 'l15-q7-a3', text: 'Diagnosi medica', isCorrect: false },
          { id: 'l15-q7-a4', text: 'Terapia farmacologica', isCorrect: false }
        ]
      },
      {
        id: 'l15-q8',
        lessonId: 15,
        questionNumber: 8,
        text: 'Quali sono i codici di triage?',
        answers: [
          { id: 'l15-q8-a1', text: 'Rosso (critico), Giallo (urgente), Verde (non urgente), Bianco (non urgente)', isCorrect: true },
          { id: 'l15-q8-a2', text: 'Solo rosso e giallo', isCorrect: false },
          { id: 'l15-q8-a3', text: 'Solo verde', isCorrect: false },
          { id: 'l15-q8-a4', text: 'Solo bianco', isCorrect: false }
        ]
      },
      {
        id: 'l15-q9',
        lessonId: 15,
        questionNumber: 9,
        text: 'Cosa fare in caso di emorragia?',
        answers: [
          { id: 'l15-q9-a1', text: 'Compressione diretta, elevazione, chiamata 118', isCorrect: true },
          { id: 'l15-q9-a2', text: 'Solo compressione', isCorrect: false },
          { id: 'l15-q9-a3', text: 'Solo chiamata 118', isCorrect: false },
          { id: 'l15-q9-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q10',
        lessonId: 15,
        questionNumber: 10,
        text: 'Cosa fare in caso di ustione?',
        answers: [
          { id: 'l15-q10-a1', text: 'Raffreddare con acqua, coprire, chiamare 118 se grave', isCorrect: true },
          { id: 'l15-q10-a2', text: 'Applicare ghiaccio direttamente', isCorrect: false },
          { id: 'l15-q10-a3', text: 'Applicare creme', isCorrect: false },
          { id: 'l15-q10-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q11',
        lessonId: 15,
        questionNumber: 11,
        text: 'Cosa fare in caso di frattura?',
        answers: [
          { id: 'l15-q11-a1', text: 'Immobilizzare, non muovere, chiamare 118', isCorrect: true },
          { id: 'l15-q11-a2', text: 'Muovere l\'arto', isCorrect: false },
          { id: 'l15-q11-a3', text: 'Riallineare l\'osso', isCorrect: false },
          { id: 'l15-q11-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q12',
        lessonId: 15,
        questionNumber: 12,
        text: 'Cosa significa shock?',
        answers: [
          { id: 'l15-q12-a1', text: 'Insufficienza circolatoria acuta', isCorrect: true },
          { id: 'l15-q12-a2', text: 'Svenimento', isCorrect: false },
          { id: 'l15-q12-a3', text: 'Convulsione', isCorrect: false },
          { id: 'l15-q12-a4', text: 'Iperventilazione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q13',
        lessonId: 15,
        questionNumber: 13,
        text: 'Cosa fare in caso di sincope?',
        answers: [
          { id: 'l15-q13-a1', text: 'Posizione supina, gambe sollevate, valutare coscienza', isCorrect: true },
          { id: 'l15-q13-a2', text: 'Posizione seduta', isCorrect: false },
          { id: 'l15-q13-a3', text: 'Posizione prona', isCorrect: false },
          { id: 'l15-q13-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q14',
        lessonId: 15,
        questionNumber: 14,
        text: 'Cosa fare in caso di trauma cranico?',
        answers: [
          { id: 'l15-q14-a1', text: 'Immobilizzare collo, monitorare coscienza, chiamare 118', isCorrect: true },
          { id: 'l15-q14-a2', text: 'Muovere la testa', isCorrect: false },
          { id: 'l15-q14-a3', text: 'Far sedere il paziente', isCorrect: false },
          { id: 'l15-q14-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q15',
        lessonId: 15,
        questionNumber: 15,
        text: 'Cosa fare in caso di intossicazione?',
        answers: [
          { id: 'l15-q15-a1', text: 'Chiamare centro antiveleni, non indurre vomito, chiamare 118', isCorrect: true },
          { id: 'l15-q15-a2', text: 'Indurre vomito sempre', isCorrect: false },
          { id: 'l15-q15-a3', text: 'Somministrare latte', isCorrect: false },
          { id: 'l15-q15-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q16',
        lessonId: 15,
        questionNumber: 16,
        text: 'Cosa significa posizione laterale di sicurezza?',
        answers: [
          { id: 'l15-q16-a1', text: 'Posizione per mantenere pervie le vie aeree in paziente incosciente', isCorrect: true },
          { id: 'l15-q16-a2', text: 'Posizione per il massaggio cardiaco', isCorrect: false },
          { id: 'l15-q16-a3', text: 'Posizione per la respirazione artificiale', isCorrect: false },
          { id: 'l15-q16-a4', text: 'Posizione per immobilizzare', isCorrect: false }
        ]
      },
      {
        id: 'l15-q17',
        lessonId: 15,
        questionNumber: 17,
        text: 'Cosa significa manovra di Heimlich?',
        answers: [
          { id: 'l15-q17-a1', text: 'Manovra per disostruire le vie aeree da corpo estraneo', isCorrect: true },
          { id: 'l15-q17-a2', text: 'Manovra per il massaggio cardiaco', isCorrect: false },
          { id: 'l15-q17-a3', text: 'Manovra per la respirazione artificiale', isCorrect: false },
          { id: 'l15-q17-a4', text: 'Manovra per immobilizzare', isCorrect: false }
        ]
      },
      {
        id: 'l15-q18',
        lessonId: 15,
        questionNumber: 18,
        text: 'Cosa significa AED?',
        answers: [
          { id: 'l15-q18-a1', text: 'Defibrillatore Automatico Esterno', isCorrect: true },
          { id: 'l15-q18-a2', text: 'Apparecchio Elettrico Defibrillante', isCorrect: false },
          { id: 'l15-q18-a3', text: 'Apparecchio Elettronico Diagnostico', isCorrect: false },
          { id: 'l15-q18-a4', text: 'Apparecchio Elettrico Diagnostico', isCorrect: false }
        ]
      },
      {
        id: 'l15-q19',
        lessonId: 15,
        questionNumber: 19,
        text: 'Cosa fare in caso di convulsione?',
        answers: [
          { id: 'l15-q19-a1', text: 'Proteggere da traumi, non bloccare, chiamare 118 se prolungata', isCorrect: true },
          { id: 'l15-q19-a2', text: 'Bloccare i movimenti', isCorrect: false },
          { id: 'l15-q19-a3', text: 'Mettere oggetti in bocca', isCorrect: false },
          { id: 'l15-q19-a4', text: 'Nessuna azione', isCorrect: false }
        ]
      },
      {
        id: 'l15-q20',
        lessonId: 15,
        questionNumber: 20,
        text: 'Quale è la posizione corretta per il massaggio cardiaco?',
        answers: [
          { id: 'l15-q20-a1', text: 'Paziente supino su superficie rigida, compressioni al centro del torace', isCorrect: true },
          { id: 'l15-q20-a2', text: 'Paziente seduto', isCorrect: false },
          { id: 'l15-q20-a3', text: 'Paziente su superficie morbida', isCorrect: false },
          { id: 'l15-q20-a4', text: 'Paziente in posizione laterale', isCorrect: false }
        ]
      }
    ];
  }

  private createHygieneQuestions(): Question[] {
    return [
      {
        id: 'l16-q1',
        lessonId: 16,
        questionNumber: 1,
        text: 'Quale è l\'importanza dell\'igiene delle mani?',
        answers: [
          { id: 'l16-q1-a1', text: 'Prevenzione primaria delle infezioni', isCorrect: true },
          { id: 'l16-q1-a2', text: 'Solo estetica', isCorrect: false },
          { id: 'l16-q1-a3', text: 'Solo comfort', isCorrect: false },
          { id: 'l16-q1-a4', text: 'Poco importante', isCorrect: false }
        ]
      },
      {
        id: 'l16-q2',
        lessonId: 16,
        questionNumber: 2,
        text: 'Quando è necessario lavare le mani?',
        answers: [
          { id: 'l16-q2-a1', text: 'Prima e dopo contatto con paziente, dopo uso servizi, dopo rimozione guanti', isCorrect: true },
          { id: 'l16-q2-a2', text: 'Solo prima del contatto', isCorrect: false },
          { id: 'l16-q2-a3', text: 'Solo dopo il contatto', isCorrect: false },
          { id: 'l16-q2-a4', text: 'Solo quando visibilmente sporche', isCorrect: false }
        ]
      },
      {
        id: 'l16-q3',
        lessonId: 16,
        questionNumber: 3,
        text: 'Cosa significa ICA?',
        answers: [
          { id: 'l16-q3-a1', text: 'Infezioni Correlate all\'Assistenza', isCorrect: true },
          { id: 'l16-q3-a2', text: 'Infezioni Controllate dall\'Assistenza', isCorrect: false },
          { id: 'l16-q3-a3', text: 'Infezioni Comuni all\'Assistenza', isCorrect: false },
          { id: 'l16-q3-a4', text: 'Infezioni Curate dall\'Assistenza', isCorrect: false }
        ]
      },
      {
        id: 'l16-q4',
        lessonId: 16,
        questionNumber: 4,
        text: 'Quale è la durata del lavaggio delle mani?',
        answers: [
          { id: 'l16-q4-a1', text: 'Almeno 40-60 secondi', isCorrect: true },
          { id: 'l16-q4-a2', text: 'Almeno 10 secondi', isCorrect: false },
          { id: 'l16-q4-a3', text: 'Almeno 20 secondi', isCorrect: false },
          { id: 'l16-q4-a4', text: 'Almeno 5 secondi', isCorrect: false }
        ]
      },
      {
        id: 'l16-q5',
        lessonId: 16,
        questionNumber: 5,
        text: 'Cosa significa pulizia?',
        answers: [
          { id: 'l16-q5-a1', text: 'Rimozione di sporco visibile', isCorrect: true },
          { id: 'l16-q5-a2', text: 'Eliminazione di tutti i microrganismi', isCorrect: false },
          { id: 'l16-q5-a3', text: 'Sterilizzazione', isCorrect: false },
          { id: 'l16-q5-a4', text: 'Disinfezione', isCorrect: false }
        ]
      },
      {
        id: 'l16-q6',
        lessonId: 16,
        questionNumber: 6,
        text: 'Cosa significa disinfezione?',
        answers: [
          { id: 'l16-q6-a1', text: 'Riduzione dei microrganismi patogeni', isCorrect: true },
          { id: 'l16-q6-a2', text: 'Eliminazione di tutti i microrganismi', isCorrect: false },
          { id: 'l16-q6-a3', text: 'Solo pulizia', isCorrect: false },
          { id: 'l16-q6-a4', text: 'Solo rimozione sporco', isCorrect: false }
        ]
      },
      {
        id: 'l16-q7',
        lessonId: 16,
        questionNumber: 7,
        text: 'Cosa significa sterilizzazione?',
        answers: [
          { id: 'l16-q7-a1', text: 'Eliminazione di tutti i microrganismi', isCorrect: true },
          { id: 'l16-q7-a2', text: 'Riduzione dei microrganismi', isCorrect: false },
          { id: 'l16-q7-a3', text: 'Solo pulizia', isCorrect: false },
          { id: 'l16-q7-a4', text: 'Solo disinfezione', isCorrect: false }
        ]
      },
      {
        id: 'l16-q8',
        lessonId: 16,
        questionNumber: 8,
        text: 'Cosa significa sanificazione?',
        answers: [
          { id: 'l16-q8-a1', text: 'Complesso di operazioni di pulizia e disinfezione', isCorrect: true },
          { id: 'l16-q8-a2', text: 'Solo pulizia', isCorrect: false },
          { id: 'l16-q8-a3', text: 'Solo disinfezione', isCorrect: false },
          { id: 'l16-q8-a4', text: 'Solo sterilizzazione', isCorrect: false }
        ]
      },
      {
        id: 'l16-q9',
        lessonId: 16,
        questionNumber: 9,
        text: 'Quale è la classificazione dei rifiuti ospedalieri?',
        answers: [
          { id: 'l16-q9-a1', text: 'Rifiuti urbani, speciali, pericolosi', isCorrect: true },
          { id: 'l16-q9-a2', text: 'Solo urbani', isCorrect: false },
          { id: 'l16-q9-a3', text: 'Solo speciali', isCorrect: false },
          { id: 'l16-q9-a4', text: 'Solo pericolosi', isCorrect: false }
        ]
      },
      {
        id: 'l16-q10',
        lessonId: 16,
        questionNumber: 10,
        text: 'Cosa significa precauzioni standard?',
        answers: [
          { id: 'l16-q10-a1', text: 'Misure di prevenzione da applicare sempre', isCorrect: true },
          { id: 'l16-q10-a2', text: 'Misure solo per pazienti infetti', isCorrect: false },
          { id: 'l16-q10-a3', text: 'Misure solo per procedure invasive', isCorrect: false },
          { id: 'l16-q10-a4', text: 'Misure opzionali', isCorrect: false }
        ]
      },
      {
        id: 'l16-q11',
        lessonId: 16,
        questionNumber: 11,
        text: 'Cosa significa precauzioni aggiuntive?',
        answers: [
          { id: 'l16-q11-a1', text: 'Misure aggiuntive per pazienti con infezioni specifiche', isCorrect: true },
          { id: 'l16-q11-a2', text: 'Misure standard', isCorrect: false },
          { id: 'l16-q11-a3', text: 'Misure opzionali', isCorrect: false },
          { id: 'l16-q11-a4', text: 'Nessuna misura', isCorrect: false }
        ]
      },
      {
        id: 'l16-q12',
        lessonId: 16,
        questionNumber: 12,
        text: 'Cosa significa isolamento?',
        answers: [
          { id: 'l16-q12-a1', text: 'Separazione del paziente per prevenire trasmissione infezioni', isCorrect: true },
          { id: 'l16-q12-a2', text: 'Separazione per privacy', isCorrect: false },
          { id: 'l16-q12-a3', text: 'Separazione per comfort', isCorrect: false },
          { id: 'l16-q12-a4', text: 'Separazione per organizzazione', isCorrect: false }
        ]
      },
      {
        id: 'l16-q13',
        lessonId: 16,
        questionNumber: 13,
        text: 'Quale è la funzione dell\'autoclave?',
        answers: [
          { id: 'l16-q13-a1', text: 'Sterilizzazione mediante vapore ad alta pressione', isCorrect: true },
          { id: 'l16-q13-a2', text: 'Solo disinfezione', isCorrect: false },
          { id: 'l16-q13-a3', text: 'Solo pulizia', isCorrect: false },
          { id: 'l16-q13-a4', text: 'Solo riscaldamento', isCorrect: false }
        ]
      },
      {
        id: 'l16-q14',
        lessonId: 16,
        questionNumber: 14,
        text: 'Cosa significa ricondizionamento dei dispositivi?',
        answers: [
          { id: 'l16-q14-a1', text: 'Processo di pulizia, disinfezione e sterilizzazione', isCorrect: true },
          { id: 'l16-q14-a2', text: 'Solo pulizia', isCorrect: false },
          { id: 'l16-q14-a3', text: 'Solo disinfezione', isCorrect: false },
          { id: 'l16-q14-a4', text: 'Solo sterilizzazione', isCorrect: false }
        ]
      },
      {
        id: 'l16-q15',
        lessonId: 16,
        questionNumber: 15,
        text: 'Quale è la temperatura di sterilizzazione in autoclave?',
        answers: [
          { id: 'l16-q15-a1', text: '121-134°C', isCorrect: true },
          { id: 'l16-q15-a2', text: '100°C', isCorrect: false },
          { id: 'l16-q15-a3', text: '80°C', isCorrect: false },
          { id: 'l16-q15-a4', text: '60°C', isCorrect: false }
        ]
      },
      {
        id: 'l16-q16',
        lessonId: 16,
        questionNumber: 16,
        text: 'Cosa significa prevenzione primaria?',
        answers: [
          { id: 'l16-q16-a1', text: 'Prevenzione dell\'insorgenza della malattia', isCorrect: true },
          { id: 'l16-q16-a2', text: 'Prevenzione delle complicanze', isCorrect: false },
          { id: 'l16-q16-a3', text: 'Prevenzione delle recidive', isCorrect: false },
          { id: 'l16-q16-a4', text: 'Trattamento della malattia', isCorrect: false }
        ]
      },
      {
        id: 'l16-q17',
        lessonId: 16,
        questionNumber: 17,
        text: 'Cosa significa prevenzione secondaria?',
        answers: [
          { id: 'l16-q17-a1', text: 'Diagnosi precoce e trattamento tempestivo', isCorrect: true },
          { id: 'l16-q17-a2', text: 'Prevenzione dell\'insorgenza', isCorrect: false },
          { id: 'l16-q17-a3', text: 'Prevenzione delle recidive', isCorrect: false },
          { id: 'l16-q17-a4', text: 'Trattamento avanzato', isCorrect: false }
        ]
      },
      {
        id: 'l16-q18',
        lessonId: 16,
        questionNumber: 18,
        text: 'Cosa significa prevenzione terziaria?',
        answers: [
          { id: 'l16-q18-a1', text: 'Riduzione delle complicanze e riabilitazione', isCorrect: true },
          { id: 'l16-q18-a2', text: 'Prevenzione dell\'insorgenza', isCorrect: false },
          { id: 'l16-q18-a3', text: 'Diagnosi precoce', isCorrect: false },
          { id: 'l16-q18-a4', text: 'Trattamento iniziale', isCorrect: false }
        ]
      },
      {
        id: 'l16-q19',
        lessonId: 16,
        questionNumber: 19,
        text: 'Quale è la classificazione dei rifiuti pericolosi?',
        answers: [
          { id: 'l16-q19-a1', text: 'Rifiuti a rischio infettivo, chimici, radioattivi', isCorrect: true },
          { id: 'l16-q19-a2', text: 'Solo a rischio infettivo', isCorrect: false },
          { id: 'l16-q19-a3', text: 'Solo chimici', isCorrect: false },
          { id: 'l16-q19-a4', text: 'Solo radioattivi', isCorrect: false }
        ]
      },
      {
        id: 'l16-q20',
        lessonId: 16,
        questionNumber: 20,
        text: 'Quale è il colore del contenitore per rifiuti a rischio infettivo?',
        answers: [
          { id: 'l16-q20-a1', text: 'Giallo', isCorrect: true },
          { id: 'l16-q20-a2', text: 'Rosso', isCorrect: false },
          { id: 'l16-q20-a3', text: 'Blu', isCorrect: false },
          { id: 'l16-q20-a4', text: 'Verde', isCorrect: false }
        ]
      }
    ];
  }

  private createBasicCareQuestions(): Question[] {
    return [
      {
        id: 'l17-q1',
        lessonId: 17,
        questionNumber: 1,
        text: 'Quale è l\'importanza dell\'igiene personale del paziente?',
        answers: [
          { id: 'l17-q1-a1', text: 'Prevenzione infezioni, comfort, dignità', isCorrect: true },
          { id: 'l17-q1-a2', text: 'Solo estetica', isCorrect: false },
          { id: 'l17-q1-a3', text: 'Solo comfort', isCorrect: false },
          { id: 'l17-q1-a4', text: 'Poco importante', isCorrect: false }
        ]
      },
      {
        id: 'l17-q2',
        lessonId: 17,
        questionNumber: 2,
        text: 'Quale è la sequenza corretta per il bagno a letto?',
        answers: [
          { id: 'l17-q2-a1', text: 'Viso, braccia, torace, addome, gambe, schiena, genitali', isCorrect: true },
          { id: 'l17-q2-a2', text: 'Qualsiasi sequenza', isCorrect: false },
          { id: 'l17-q2-a3', text: 'Solo parti visibili', isCorrect: false },
          { id: 'l17-q2-a4', text: 'Solo parti sporche', isCorrect: false }
        ]
      },
      {
        id: 'l17-q3',
        lessonId: 17,
        questionNumber: 3,
        text: 'Cosa significa accoglienza del paziente?',
        answers: [
          { id: 'l17-q3-a1', text: 'Primo approccio per creare relazione di fiducia', isCorrect: true },
          { id: 'l17-q3-a2', text: 'Solo registrazione', isCorrect: false },
          { id: 'l17-q3-a3', text: 'Solo assegnazione stanza', isCorrect: false },
          { id: 'l17-q3-a4', text: 'Solo compilazione documenti', isCorrect: false }
        ]
      },
      {
        id: 'l17-q4',
        lessonId: 17,
        questionNumber: 4,
        text: 'Quale è l\'importanza del comfort del paziente?',
        answers: [
          { id: 'l17-q4-a1', text: 'Fondamentale per il benessere e la guarigione', isCorrect: true },
          { id: 'l17-q4-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l17-q4-a3', text: 'Solo estetico', isCorrect: false },
          { id: 'l17-q4-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l17-q5',
        lessonId: 17,
        questionNumber: 5,
        text: 'Cosa significa supporto all\'eliminazione?',
        answers: [
          { id: 'l17-q5-a1', text: 'Assistenza per minzione e defecazione', isCorrect: true },
          { id: 'l17-q5-a2', text: 'Solo minzione', isCorrect: false },
          { id: 'l17-q5-a3', text: 'Solo defecazione', isCorrect: false },
          { id: 'l17-q5-a4', text: 'Solo igiene', isCorrect: false }
        ]
      },
      {
        id: 'l17-q6',
        lessonId: 17,
        questionNumber: 6,
        text: 'Quale è la posizione corretta per il paziente allettato?',
        answers: [
          { id: 'l17-q6-a1', text: 'Cambiare posizione ogni 2 ore, usare cuscini di supporto', isCorrect: true },
          { id: 'l17-q6-a2', text: 'Sempre supino', isCorrect: false },
          { id: 'l17-q6-a3', text: 'Sempre laterale', isCorrect: false },
          { id: 'l17-q6-a4', text: 'Qualsiasi posizione comoda', isCorrect: false }
        ]
      },
      {
        id: 'l17-q7',
        lessonId: 17,
        questionNumber: 7,
        text: 'Cosa significa decubito?',
        answers: [
          { id: 'l17-q7-a1', text: 'Lesione da pressione', isCorrect: true },
          { id: 'l17-q7-a2', text: 'Posizione del paziente', isCorrect: false },
          { id: 'l17-q7-a3', text: 'Tipo di letto', isCorrect: false },
          { id: 'l17-q7-a4', text: 'Tipo di cuscino', isCorrect: false }
        ]
      },
      {
        id: 'l17-q8',
        lessonId: 17,
        questionNumber: 8,
        text: 'Come prevenire i decubiti?',
        answers: [
          { id: 'l17-q8-a1', text: 'Cambio posizione, igiene, idratazione, materassi antidecubito', isCorrect: true },
          { id: 'l17-q8-a2', text: 'Solo cambio posizione', isCorrect: false },
          { id: 'l17-q8-a3', text: 'Solo igiene', isCorrect: false },
          { id: 'l17-q8-a4', text: 'Nessuna prevenzione necessaria', isCorrect: false }
        ]
      },
      {
        id: 'l17-q9',
        lessonId: 17,
        questionNumber: 9,
        text: 'Quale è l\'importanza della mobilizzazione?',
        answers: [
          { id: 'l17-q9-a1', text: 'Prevenzione complicanze, mantenimento funzionalità', isCorrect: true },
          { id: 'l17-q9-a2', text: 'Solo comfort', isCorrect: false },
          { id: 'l17-q9-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l17-q9-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l17-q10',
        lessonId: 17,
        questionNumber: 10,
        text: 'Cosa significa assistenza al comfort?',
        answers: [
          { id: 'l17-q10-a1', text: 'Garantire benessere fisico e psicologico', isCorrect: true },
          { id: 'l17-q10-a2', text: 'Solo benessere fisico', isCorrect: false },
          { id: 'l17-q10-a3', text: 'Solo benessere psicologico', isCorrect: false },
          { id: 'l17-q10-a4', text: 'Solo igiene', isCorrect: false }
        ]
      },
      {
        id: 'l17-q11',
        lessonId: 17,
        questionNumber: 11,
        text: 'Quale è la temperatura dell\'acqua per il bagno?',
        answers: [
          { id: 'l17-q11-a1', text: 'Circa 37-40°C', isCorrect: true },
          { id: 'l17-q11-a2', text: 'Circa 30°C', isCorrect: false },
          { id: 'l17-q11-a3', text: 'Circa 50°C', isCorrect: false },
          { id: 'l17-q11-a4', text: 'Circa 20°C', isCorrect: false }
        ]
      },
      {
        id: 'l17-q12',
        lessonId: 17,
        questionNumber: 12,
        text: 'Cosa significa assistenza all\'igiene orale?',
        answers: [
          { id: 'l17-q12-a1', text: 'Pulizia di denti, gengive, lingua, protesi', isCorrect: true },
          { id: 'l17-q12-a2', text: 'Solo denti', isCorrect: false },
          { id: 'l17-q12-a3', text: 'Solo gengive', isCorrect: false },
          { id: 'l17-q12-a4', text: 'Solo protesi', isCorrect: false }
        ]
      },
      {
        id: 'l17-q13',
        lessonId: 17,
        questionNumber: 13,
        text: 'Quale è l\'importanza dell\'assistenza all\'igiene per pazienti allettati?',
        answers: [
          { id: 'l17-q13-a1', text: 'Prevenzione infezioni, comfort, dignità, benessere', isCorrect: true },
          { id: 'l17-q13-a2', text: 'Solo estetica', isCorrect: false },
          { id: 'l17-q13-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l17-q13-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l17-q14',
        lessonId: 17,
        questionNumber: 14,
        text: 'Cosa significa assistenza al cambio biancheria?',
        answers: [
          { id: 'l17-q14-a1', text: 'Cambio lenzuola mantenendo paziente coperto e comodo', isCorrect: true },
          { id: 'l17-q14-a2', text: 'Cambio solo quando sporco', isCorrect: false },
          { id: 'l17-q14-a3', text: 'Cambio senza precauzioni', isCorrect: false },
          { id: 'l17-q14-a4', text: 'Cambio solo su richiesta', isCorrect: false }
        ]
      },
      {
        id: 'l17-q15',
        lessonId: 17,
        questionNumber: 15,
        text: 'Quale è l\'importanza della privacy durante l\'assistenza?',
        answers: [
          { id: 'l17-q15-a1', text: 'Fondamentale per la dignità del paziente', isCorrect: true },
          { id: 'l17-q15-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l17-q15-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l17-q15-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l17-q16',
        lessonId: 17,
        questionNumber: 16,
        text: 'Cosa significa assistenza al comfort ambientale?',
        answers: [
          { id: 'l17-q16-a1', text: 'Garantire temperatura, illuminazione, rumore, ordine appropriati', isCorrect: true },
          { id: 'l17-q16-a2', text: 'Solo temperatura', isCorrect: false },
          { id: 'l17-q16-a3', text: 'Solo illuminazione', isCorrect: false },
          { id: 'l17-q16-a4', text: 'Nessuna attenzione necessaria', isCorrect: false }
        ]
      },
      {
        id: 'l17-q17',
        lessonId: 17,
        questionNumber: 17,
        text: 'Quale è la temperatura ambientale ideale?',
        answers: [
          { id: 'l17-q17-a1', text: 'Circa 20-22°C', isCorrect: true },
          { id: 'l17-q17-a2', text: 'Circa 15°C', isCorrect: false },
          { id: 'l17-q17-a3', text: 'Circa 30°C', isCorrect: false },
          { id: 'l17-q17-a4', text: 'Qualsiasi temperatura', isCorrect: false }
        ]
      },
      {
        id: 'l17-q18',
        lessonId: 17,
        questionNumber: 18,
        text: 'Cosa significa assistenza al riposo?',
        answers: [
          { id: 'l17-q18-a1', text: 'Garantire condizioni per riposo e sonno adeguati', isCorrect: true },
          { id: 'l17-q18-a2', text: 'Solo silenzio', isCorrect: false },
          { id: 'l17-q18-a3', text: 'Solo buio', isCorrect: false },
          { id: 'l17-q18-a4', text: 'Nessuna attenzione necessaria', isCorrect: false }
        ]
      },
      {
        id: 'l17-q19',
        lessonId: 17,
        questionNumber: 19,
        text: 'Quale è l\'importanza della comunicazione durante l\'assistenza?',
        answers: [
          { id: 'l17-q19-a1', text: 'Fondamentale per relazione di fiducia e collaborazione', isCorrect: true },
          { id: 'l17-q19-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l17-q19-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l17-q19-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l17-q20',
        lessonId: 17,
        questionNumber: 20,
        text: 'Cosa significa assistenza personalizzata?',
        answers: [
          { id: 'l17-q20-a1', text: 'Assistenza adattata alle esigenze specifiche del paziente', isCorrect: true },
          { id: 'l17-q20-a2', text: 'Assistenza standard per tutti', isCorrect: false },
          { id: 'l17-q20-a3', text: 'Assistenza minima', isCorrect: false },
          { id: 'l17-q20-a4', text: 'Assistenza generica', isCorrect: false }
        ]
      }
    ];
  }

  private createSurgicalPatientQuestions(): Question[] {
    return [
      {
        id: 'l18-q1',
        lessonId: 18,
        questionNumber: 1,
        text: 'Cosa significa periodo perioperatorio?',
        answers: [
          { id: 'l18-q1-a1', text: 'Periodo che include pre, intra e post operatorio', isCorrect: true },
          { id: 'l18-q1-a2', text: 'Solo pre operatorio', isCorrect: false },
          { id: 'l18-q1-a3', text: 'Solo post operatorio', isCorrect: false },
          { id: 'l18-q1-a4', text: 'Solo intra operatorio', isCorrect: false }
        ]
      },
      {
        id: 'l18-q2',
        lessonId: 18,
        questionNumber: 2,
        text: 'Cosa significa tricotomia pre-operatoria?',
        answers: [
          { id: 'l18-q2-a1', text: 'Rasatura della zona chirurgica', isCorrect: true },
          { id: 'l18-q2-a2', text: 'Lavaggio della zona', isCorrect: false },
          { id: 'l18-q2-a3', text: 'Disinfezione della zona', isCorrect: false },
          { id: 'l18-q2-a4', text: 'Anestesia locale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q3',
        lessonId: 18,
        questionNumber: 3,
        text: 'Quale è la preparazione pre-operatoria?',
        answers: [
          { id: 'l18-q3-a1', text: 'Digiuno, preparazione cutanea, consenso, documentazione', isCorrect: true },
          { id: 'l18-q3-a2', text: 'Solo digiuno', isCorrect: false },
          { id: 'l18-q3-a3', text: 'Solo preparazione cutanea', isCorrect: false },
          { id: 'l18-q3-a4', text: 'Nessuna preparazione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q4',
        lessonId: 18,
        questionNumber: 4,
        text: 'Quale è il digiuno pre-operatorio?',
        answers: [
          { id: 'l18-q4-a1', text: 'Almeno 6-8 ore per cibi solidi, 2-4 ore per liquidi chiari', isCorrect: true },
          { id: 'l18-q4-a2', text: '24 ore', isCorrect: false },
          { id: 'l18-q4-a3', text: '2 ore', isCorrect: false },
          { id: 'l18-q4-a4', text: 'Nessun digiuno', isCorrect: false }
        ]
      },
      {
        id: 'l18-q5',
        lessonId: 18,
        questionNumber: 5,
        text: 'Quale è la preparazione della stanza post-operatoria?',
        answers: [
          { id: 'l18-q5-a1', text: 'Letto preparato, apparecchiature pronte, ambiente pulito', isCorrect: true },
          { id: 'l18-q5-a2', text: 'Solo letto preparato', isCorrect: false },
          { id: 'l18-q5-a3', text: 'Solo apparecchiature', isCorrect: false },
          { id: 'l18-q5-a4', text: 'Nessuna preparazione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q6',
        lessonId: 18,
        questionNumber: 6,
        text: 'Cosa significa monitoraggio post-operatorio?',
        answers: [
          { id: 'l18-q6-a1', text: 'Controllo continuo dei parametri vitali e condizioni', isCorrect: true },
          { id: 'l18-q6-a2', text: 'Solo parametri vitali', isCorrect: false },
          { id: 'l18-q6-a3', text: 'Solo condizioni generali', isCorrect: false },
          { id: 'l18-q6-a4', text: 'Controllo occasionale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q7',
        lessonId: 18,
        questionNumber: 7,
        text: 'Quali parametri monitorare post-operatorio?',
        answers: [
          { id: 'l18-q7-a1', text: 'PA, FC, FR, temperatura, SpO2, dolore, ferita chirurgica', isCorrect: true },
          { id: 'l18-q7-a2', text: 'Solo PA e FC', isCorrect: false },
          { id: 'l18-q7-a3', text: 'Solo temperatura', isCorrect: false },
          { id: 'l18-q7-a4', text: 'Solo dolore', isCorrect: false }
        ]
      },
      {
        id: 'l18-q8',
        lessonId: 18,
        questionNumber: 8,
        text: 'Cosa significa deiscenza della ferita?',
        answers: [
          { id: 'l18-q8-a1', text: 'Apertura della ferita chirurgica', isCorrect: true },
          { id: 'l18-q8-a2', text: 'Infezione della ferita', isCorrect: false },
          { id: 'l18-q8-a3', text: 'Guarigione della ferita', isCorrect: false },
          { id: 'l18-q8-a4', text: 'Cicatrizzazione normale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q9',
        lessonId: 18,
        questionNumber: 9,
        text: 'Cosa significa emorragia post-operatoria?',
        answers: [
          { id: 'l18-q9-a1', text: 'Sanguinamento dopo intervento chirurgico', isCorrect: true },
          { id: 'l18-q9-a2', text: 'Sanguinamento normale', isCorrect: false },
          { id: 'l18-q9-a3', text: 'Infezione', isCorrect: false },
          { id: 'l18-q9-a4', text: 'Guarigione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q10',
        lessonId: 18,
        questionNumber: 10,
        text: 'Quale è l\'importanza della mobilizzazione precoce?',
        answers: [
          { id: 'l18-q10-a1', text: 'Prevenzione complicanze, miglioramento circolazione, recupero funzionale', isCorrect: true },
          { id: 'l18-q10-a2', text: 'Solo comfort', isCorrect: false },
          { id: 'l18-q10-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l18-q10-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q11',
        lessonId: 18,
        questionNumber: 11,
        text: 'Cosa significa anestesia generale?',
        answers: [
          { id: 'l18-q11-a1', text: 'Perdita di coscienza e sensibilità', isCorrect: true },
          { id: 'l18-q11-a2', text: 'Solo perdita di sensibilità locale', isCorrect: false },
          { id: 'l18-q11-a3', text: 'Solo sedazione', isCorrect: false },
          { id: 'l18-q11-a4', text: 'Solo analgesia', isCorrect: false }
        ]
      },
      {
        id: 'l18-q12',
        lessonId: 18,
        questionNumber: 12,
        text: 'Cosa significa anestesia locale?',
        answers: [
          { id: 'l18-q12-a1', text: 'Perdita di sensibilità in area limitata', isCorrect: true },
          { id: 'l18-q12-a2', text: 'Perdita di coscienza', isCorrect: false },
          { id: 'l18-q12-a3', text: 'Perdita di sensibilità totale', isCorrect: false },
          { id: 'l18-q12-a4', text: 'Sedazione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q13',
        lessonId: 18,
        questionNumber: 13,
        text: 'Quale è l\'importanza del consenso informato?',
        answers: [
          { id: 'l18-q13-a1', text: 'Diritto del paziente a essere informato e decidere', isCorrect: true },
          { id: 'l18-q13-a2', text: 'Solo formale', isCorrect: false },
          { id: 'l18-q13-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l18-q13-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q14',
        lessonId: 18,
        questionNumber: 14,
        text: 'Cosa significa shock post-operatorio?',
        answers: [
          { id: 'l18-q14-a1', text: 'Insufficienza circolatoria dopo intervento', isCorrect: true },
          { id: 'l18-q14-a2', text: 'Svenimento', isCorrect: false },
          { id: 'l18-q14-a3', text: 'Dolore', isCorrect: false },
          { id: 'l18-q14-a4', text: 'Nausea', isCorrect: false }
        ]
      },
      {
        id: 'l18-q15',
        lessonId: 18,
        questionNumber: 15,
        text: 'Quale è l\'importanza della gestione del dolore post-operatorio?',
        answers: [
          { id: 'l18-q15-a1', text: 'Fondamentale per comfort, recupero, prevenzione complicanze', isCorrect: true },
          { id: 'l18-q15-a2', text: 'Solo comfort', isCorrect: false },
          { id: 'l18-q15-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l18-q15-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l18-q16',
        lessonId: 18,
        questionNumber: 16,
        text: 'Cosa significa trombosi venosa profonda?',
        answers: [
          { id: 'l18-q16-a1', text: 'Formazione di coagulo nelle vene profonde', isCorrect: true },
          { id: 'l18-q16-a2', text: 'Infezione venosa', isCorrect: false },
          { id: 'l18-q16-a3', text: 'Rottura venosa', isCorrect: false },
          { id: 'l18-q16-a4', text: 'Dilatazione venosa', isCorrect: false }
        ]
      },
      {
        id: 'l18-q17',
        lessonId: 18,
        questionNumber: 17,
        text: 'Come prevenire la trombosi venosa profonda?',
        answers: [
          { id: 'l18-q17-a1', text: 'Mobilizzazione precoce, calze elastiche, anticoagulanti', isCorrect: true },
          { id: 'l18-q17-a2', text: 'Solo immobilizzazione', isCorrect: false },
          { id: 'l18-q17-a3', text: 'Solo riposo', isCorrect: false },
          { id: 'l18-q17-a4', text: 'Nessuna prevenzione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q18',
        lessonId: 18,
        questionNumber: 18,
        text: 'Cosa significa atelettasia?',
        answers: [
          { id: 'l18-q18-a1', text: 'Collasso degli alveoli polmonari', isCorrect: true },
          { id: 'l18-q18-a2', text: 'Dilatazione polmonare', isCorrect: false },
          { id: 'l18-q18-a3', text: 'Infezione polmonare', isCorrect: false },
          { id: 'l18-q18-a4', text: 'Embolia polmonare', isCorrect: false }
        ]
      },
      {
        id: 'l18-q19',
        lessonId: 18,
        questionNumber: 19,
        text: 'Come prevenire l\'atelettasia?',
        answers: [
          { id: 'l18-q19-a1', text: 'Respirazione profonda, tosse, mobilizzazione precoce', isCorrect: true },
          { id: 'l18-q19-a2', text: 'Solo riposo', isCorrect: false },
          { id: 'l18-q19-a3', text: 'Solo immobilizzazione', isCorrect: false },
          { id: 'l18-q19-a4', text: 'Nessuna prevenzione', isCorrect: false }
        ]
      },
      {
        id: 'l18-q20',
        lessonId: 18,
        questionNumber: 20,
        text: 'Quale è l\'importanza della documentazione post-operatoria?',
        answers: [
          { id: 'l18-q20-a1', text: 'Fondamentale per continuità assistenziale e sicurezza', isCorrect: true },
          { id: 'l18-q20-a2', text: 'Solo formale', isCorrect: false },
          { id: 'l18-q20-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l18-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }
  private createElderlyCareQuestions(): Question[] {
    return [
      {
        id: 'l19-q1',
        lessonId: 19,
        questionNumber: 1,
        text: 'Cosa significa geriatria?',
        answers: [
          { id: 'l19-q1-a1', text: 'Branca della medicina che studia le malattie dell\'anziano', isCorrect: true },
          { id: 'l19-q1-a2', text: 'Studio dell\'invecchiamento', isCorrect: false },
          { id: 'l19-q1-a3', text: 'Cura dei bambini', isCorrect: false },
          { id: 'l19-q1-a4', text: 'Cura degli adulti', isCorrect: false }
        ]
      },
      {
        id: 'l19-q2',
        lessonId: 19,
        questionNumber: 2,
        text: 'Cosa significa gerontologia?',
        answers: [
          { id: 'l19-q2-a1', text: 'Studio dell\'invecchiamento in tutte le sue dimensioni', isCorrect: true },
          { id: 'l19-q2-a2', text: 'Studio delle malattie', isCorrect: false },
          { id: 'l19-q2-a3', text: 'Cura dei bambini', isCorrect: false },
          { id: 'l19-q2-a4', text: 'Cura degli adulti', isCorrect: false }
        ]
      },
      {
        id: 'l19-q3',
        lessonId: 19,
        questionNumber: 3,
        text: 'Cosa significa declino funzionale?',
        answers: [
          { id: 'l19-q3-a1', text: 'Riduzione delle capacità funzionali nell\'anziano', isCorrect: true },
          { id: 'l19-q3-a2', text: 'Aumento delle capacità', isCorrect: false },
          { id: 'l19-q3-a3', text: 'Mantenimento delle capacità', isCorrect: false },
          { id: 'l19-q3-a4', text: 'Miglioramento delle capacità', isCorrect: false }
        ]
      },
      {
        id: 'l19-q4',
        lessonId: 19,
        questionNumber: 4,
        text: 'Cosa significa polipatologia?',
        answers: [
          { id: 'l19-q4-a1', text: 'Presenza di più patologie contemporaneamente', isCorrect: true },
          { id: 'l19-q4-a2', text: 'Presenza di una sola patologia', isCorrect: false },
          { id: 'l19-q4-a3', text: 'Assenza di patologie', isCorrect: false },
          { id: 'l19-q4-a4', text: 'Patologia acuta', isCorrect: false }
        ]
      },
      {
        id: 'l19-q5',
        lessonId: 19,
        questionNumber: 5,
        text: 'Cosa significa politerapia?',
        answers: [
          { id: 'l19-q5-a1', text: 'Assunzione di più farmaci contemporaneamente', isCorrect: true },
          { id: 'l19-q5-a2', text: 'Assunzione di un solo farmaco', isCorrect: false },
          { id: 'l19-q5-a3', text: 'Assenza di farmaci', isCorrect: false },
          { id: 'l19-q5-a4', text: 'Terapia alternativa', isCorrect: false }
        ]
      },
      {
        id: 'l19-q6',
        lessonId: 19,
        questionNumber: 6,
        text: 'Cosa significa fragilità nell\'anziano?',
        answers: [
          { id: 'l19-q6-a1', text: 'Stato di vulnerabilità che aumenta rischio di eventi avversi', isCorrect: true },
          { id: 'l19-q6-a2', text: 'Stato di forza', isCorrect: false },
          { id: 'l19-q6-a3', text: 'Stato di salute', isCorrect: false },
          { id: 'l19-q6-a4', text: 'Stato di benessere', isCorrect: false }
        ]
      },
      {
        id: 'l19-q7',
        lessonId: 19,
        questionNumber: 7,
        text: 'Cosa significa demenza?',
        answers: [
          { id: 'l19-q7-a1', text: 'Deterioramento delle funzioni cognitive', isCorrect: true },
          { id: 'l19-q7-a2', text: 'Miglioramento cognitivo', isCorrect: false },
          { id: 'l19-q7-a3', text: 'Stabilità cognitiva', isCorrect: false },
          { id: 'l19-q7-a4', text: 'Perdita di memoria temporanea', isCorrect: false }
        ]
      },
      {
        id: 'l19-q8',
        lessonId: 19,
        questionNumber: 8,
        text: 'Cosa significa assistenza domiciliare?',
        answers: [
          { id: 'l19-q8-a1', text: 'Assistenza fornita al domicilio del paziente', isCorrect: true },
          { id: 'l19-q8-a2', text: 'Assistenza solo in ospedale', isCorrect: false },
          { id: 'l19-q8-a3', text: 'Assistenza solo in RSA', isCorrect: false },
          { id: 'l19-q8-a4', text: 'Assistenza solo ambulatoriale', isCorrect: false }
        ]
      },
      {
        id: 'l19-q9',
        lessonId: 19,
        questionNumber: 9,
        text: 'Cosa significa valutazione multidimensionale?',
        answers: [
          { id: 'l19-q9-a1', text: 'Valutazione globale di aspetti fisici, cognitivi, sociali, funzionali', isCorrect: true },
          { id: 'l19-q9-a2', text: 'Solo aspetti fisici', isCorrect: false },
          { id: 'l19-q9-a3', text: 'Solo aspetti cognitivi', isCorrect: false },
          { id: 'l19-q9-a4', text: 'Solo aspetti sociali', isCorrect: false }
        ]
      },
      {
        id: 'l19-q10',
        lessonId: 19,
        questionNumber: 10,
        text: 'Cosa significa terapia occupazionale?',
        answers: [
          { id: 'l19-q10-a1', text: 'Terapia che utilizza attività per migliorare autonomia', isCorrect: true },
          { id: 'l19-q10-a2', text: 'Terapia farmacologica', isCorrect: false },
          { id: 'l19-q10-a3', text: 'Terapia chirurgica', isCorrect: false },
          { id: 'l19-q10-a4', text: 'Terapia fisica', isCorrect: false }
        ]
      },
      {
        id: 'l19-q11',
        lessonId: 19,
        questionNumber: 11,
        text: 'Cosa significa sindrome da immobilizzazione?',
        answers: [
          { id: 'l19-q11-a1', text: 'Complicanze da prolungata immobilità', isCorrect: true },
          { id: 'l19-q11-a2', text: 'Miglioramento da immobilità', isCorrect: false },
          { id: 'l19-q11-a3', text: 'Stato normale', isCorrect: false },
          { id: 'l19-q11-a4', text: 'Stato di benessere', isCorrect: false }
        ]
      },
      {
        id: 'l19-q12',
        lessonId: 19,
        questionNumber: 12,
        text: 'Cosa significa inappropriato ricovero geriatrico?',
        answers: [
          { id: 'l19-q12-a1', text: 'Ricovero non necessario o in struttura non adeguata', isCorrect: true },
          { id: 'l19-q12-a2', text: 'Ricovero appropriato', isCorrect: false },
          { id: 'l19-q12-a3', text: 'Ricovero necessario', isCorrect: false },
          { id: 'l19-q12-a4', text: 'Ricovero programmato', isCorrect: false }
        ]
      },
      {
        id: 'l19-q13',
        lessonId: 19,
        questionNumber: 13,
        text: 'Quale è l\'importanza della continuità assistenziale nell\'anziano?',
        answers: [
          { id: 'l19-q13-a1', text: 'Fondamentale per qualità di vita e prevenzione complicanze', isCorrect: true },
          { id: 'l19-q13-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l19-q13-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l19-q13-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l19-q14',
        lessonId: 19,
        questionNumber: 14,
        text: 'Cosa significa delirium?',
        answers: [
          { id: 'l19-q14-a1', text: 'Alterazione acuta dello stato di coscienza', isCorrect: true },
          { id: 'l19-q14-a2', text: 'Stato di coscienza normale', isCorrect: false },
          { id: 'l19-q14-a3', text: 'Stato di sonno', isCorrect: false },
          { id: 'l19-q14-a4', text: 'Stato di veglia', isCorrect: false }
        ]
      },
      {
        id: 'l19-q15',
        lessonId: 19,
        questionNumber: 15,
        text: 'Quale è l\'importanza della prevenzione delle cadute?',
        answers: [
          { id: 'l19-q15-a1', text: 'Fondamentale per sicurezza e qualità di vita', isCorrect: true },
          { id: 'l19-q15-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l19-q15-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l19-q15-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l19-q16',
        lessonId: 19,
        questionNumber: 16,
        text: 'Cosa significa sarcopenia?',
        answers: [
          { id: 'l19-q16-a1', text: 'Perdita di massa e forza muscolare', isCorrect: true },
          { id: 'l19-q16-a2', text: 'Aumento di massa muscolare', isCorrect: false },
          { id: 'l19-q16-a3', text: 'Mantenimento massa muscolare', isCorrect: false },
          { id: 'l19-q16-a4', text: 'Miglioramento massa muscolare', isCorrect: false }
        ]
      },
      {
        id: 'l19-q17',
        lessonId: 19,
        questionNumber: 17,
        text: 'Cosa significa malnutrizione nell\'anziano?',
        answers: [
          { id: 'l19-q17-a1', text: 'Stato nutrizionale alterato per carenza o eccesso', isCorrect: true },
          { id: 'l19-q17-a2', text: 'Stato nutrizionale normale', isCorrect: false },
          { id: 'l19-q17-a3', text: 'Solo carenza', isCorrect: false },
          { id: 'l19-q17-a4', text: 'Solo eccesso', isCorrect: false }
        ]
      },
      {
        id: 'l19-q18',
        lessonId: 19,
        questionNumber: 18,
        text: 'Quale è l\'importanza della socializzazione nell\'anziano?',
        answers: [
          { id: 'l19-q18-a1', text: 'Fondamentale per benessere psicologico e prevenzione isolamento', isCorrect: true },
          { id: 'l19-q18-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l19-q18-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l19-q18-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l19-q19',
        lessonId: 19,
        questionNumber: 19,
        text: 'Cosa significa approccio multidimensionale?',
        answers: [
          { id: 'l19-q19-a1', text: 'Approccio che considera tutte le dimensioni della persona', isCorrect: true },
          { id: 'l19-q19-a2', text: 'Approccio solo fisico', isCorrect: false },
          { id: 'l19-q19-a3', text: 'Approccio solo psicologico', isCorrect: false },
          { id: 'l19-q19-a4', text: 'Approccio solo sociale', isCorrect: false }
        ]
      },
      {
        id: 'l19-q20',
        lessonId: 19,
        questionNumber: 20,
        text: 'Quale è l\'importanza del rispetto dell\'autonomia nell\'anziano?',
        answers: [
          { id: 'l19-q20-a1', text: 'Fondamentale per dignità e qualità di vita', isCorrect: true },
          { id: 'l19-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l19-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l19-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  private createPediatricQuestions(): Question[] {
    return [
      {
        id: 'l20-q1',
        lessonId: 20,
        questionNumber: 1,
        text: 'Cosa significa pediatria?',
        answers: [
          { id: 'l20-q1-a1', text: 'Branca della medicina che cura i bambini', isCorrect: true },
          { id: 'l20-q1-a2', text: 'Cura degli anziani', isCorrect: false },
          { id: 'l20-q1-a3', text: 'Cura degli adulti', isCorrect: false },
          { id: 'l20-q1-a4', text: 'Cura delle donne', isCorrect: false }
        ]
      },
      {
        id: 'l20-q2',
        lessonId: 20,
        questionNumber: 2,
        text: 'Quale è la frequenza cardiaca normale nel neonato?',
        answers: [
          { id: 'l20-q2-a1', text: '100-160 bpm', isCorrect: true },
          { id: 'l20-q2-a2', text: '60-100 bpm', isCorrect: false },
          { id: 'l20-q2-a3', text: '80-120 bpm', isCorrect: false },
          { id: 'l20-q2-a4', text: '120-180 bpm', isCorrect: false }
        ]
      },
      {
        id: 'l20-q3',
        lessonId: 20,
        questionNumber: 3,
        text: 'Quale è la frequenza respiratoria normale nel neonato?',
        answers: [
          { id: 'l20-q3-a1', text: '30-60 atti/minuto', isCorrect: true },
          { id: 'l20-q3-a2', text: '12-20 atti/minuto', isCorrect: false },
          { id: 'l20-q3-a3', text: '20-30 atti/minuto', isCorrect: false },
          { id: 'l20-q3-a4', text: '60-80 atti/minuto', isCorrect: false }
        ]
      },
      {
        id: 'l20-q4',
        lessonId: 20,
        questionNumber: 4,
        text: 'Quale è la temperatura normale nel neonato?',
        answers: [
          { id: 'l20-q4-a1', text: '36,5-37,5°C', isCorrect: true },
          { id: 'l20-q4-a2', text: '35-36°C', isCorrect: false },
          { id: 'l20-q4-a3', text: '38-39°C', isCorrect: false },
          { id: 'l20-q4-a4', text: '37,5-38,5°C', isCorrect: false }
        ]
      },
      {
        id: 'l20-q5',
        lessonId: 20,
        questionNumber: 5,
        text: 'Cosa significa sviluppo psicomotorio?',
        answers: [
          { id: 'l20-q5-a1', text: 'Sviluppo delle capacità motorie e cognitive', isCorrect: true },
          { id: 'l20-q5-a2', text: 'Solo motorie', isCorrect: false },
          { id: 'l20-q5-a3', text: 'Solo cognitive', isCorrect: false },
          { id: 'l20-q5-a4', text: 'Solo sociali', isCorrect: false }
        ]
      },
      {
        id: 'l20-q6',
        lessonId: 20,
        questionNumber: 6,
        text: 'Quale è l\'importanza dell\'approccio al bambino?',
        answers: [
          { id: 'l20-q6-a1', text: 'Fondamentale per creare fiducia e collaborazione', isCorrect: true },
          { id: 'l20-q6-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q6-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l20-q6-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q7',
        lessonId: 20,
        questionNumber: 7,
        text: 'Cosa significa nutrizione nel bambino?',
        answers: [
          { id: 'l20-q7-a1', text: 'Fondamentale per crescita e sviluppo', isCorrect: true },
          { id: 'l20-q7-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q7-a3', text: 'Solo per sopravvivenza', isCorrect: false },
          { id: 'l20-q7-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q8',
        lessonId: 20,
        questionNumber: 8,
        text: 'Quale è l\'importanza del gioco nel bambino?',
        answers: [
          { id: 'l20-q8-a1', text: 'Fondamentale per sviluppo, apprendimento, benessere', isCorrect: true },
          { id: 'l20-q8-a2', text: 'Solo divertimento', isCorrect: false },
          { id: 'l20-q8-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q8-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q9',
        lessonId: 20,
        questionNumber: 9,
        text: 'Cosa significa cure palliative pediatriche?',
        answers: [
          { id: 'l20-q9-a1', text: 'Cure per migliorare qualità di vita in malattia grave', isCorrect: true },
          { id: 'l20-q9-a2', text: 'Cure curative', isCorrect: false },
          { id: 'l20-q9-a3', text: 'Cure preventive', isCorrect: false },
          { id: 'l20-q9-a4', text: 'Cure chirurgiche', isCorrect: false }
        ]
      },
      {
        id: 'l20-q10',
        lessonId: 20,
        questionNumber: 10,
        text: 'Quale è l\'importanza della comunicazione con i genitori?',
        answers: [
          { id: 'l20-q10-a1', text: 'Fondamentale per collaborazione e supporto', isCorrect: true },
          { id: 'l20-q10-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q10-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l20-q10-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q11',
        lessonId: 20,
        questionNumber: 11,
        text: 'Cosa significa gestione del lutto pediatrico?',
        answers: [
          { id: 'l20-q11-a1', text: 'Supporto a famiglia e operatori in caso di perdita', isCorrect: true },
          { id: 'l20-q11-a2', text: 'Solo supporto famiglia', isCorrect: false },
          { id: 'l20-q11-a3', text: 'Solo supporto operatori', isCorrect: false },
          { id: 'l20-q11-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l20-q12',
        lessonId: 20,
        questionNumber: 12,
        text: 'Quale è l\'importanza dei diritti del minore?',
        answers: [
          { id: 'l20-q12-a1', text: 'Fondamentale per protezione e benessere', isCorrect: true },
          { id: 'l20-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l20-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q13',
        lessonId: 20,
        questionNumber: 13,
        text: 'Cosa significa approccio specializzato alla mobilizzazione del bambino?',
        answers: [
          { id: 'l20-q13-a1', text: 'Tecniche adattate alle caratteristiche del bambino', isCorrect: true },
          { id: 'l20-q13-a2', text: 'Tecniche standard', isCorrect: false },
          { id: 'l20-q13-a3', text: 'Tecniche per adulti', isCorrect: false },
          { id: 'l20-q13-a4', text: 'Nessuna tecnica specifica', isCorrect: false }
        ]
      },
      {
        id: 'l20-q14',
        lessonId: 20,
        questionNumber: 14,
        text: 'Quale è l\'importanza della gestione delle tecnologie nel neonato?',
        answers: [
          { id: 'l20-q14-a1', text: 'Fondamentale per sicurezza e monitoraggio', isCorrect: true },
          { id: 'l20-q14-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q14-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l20-q14-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q15',
        lessonId: 20,
        questionNumber: 15,
        text: 'Cosa significa psicologia dello sviluppo?',
        answers: [
          { id: 'l20-q15-a1', text: 'Studio dello sviluppo psicologico nell\'infanzia e adolescenza', isCorrect: true },
          { id: 'l20-q15-a2', text: 'Studio solo dell\'infanzia', isCorrect: false },
          { id: 'l20-q15-a3', text: 'Studio solo dell\'adolescenza', isCorrect: false },
          { id: 'l20-q15-a4', text: 'Studio degli adulti', isCorrect: false }
        ]
      },
      {
        id: 'l20-q16',
        lessonId: 20,
        questionNumber: 16,
        text: 'Quale è l\'importanza della nutrizione e accrescimento?',
        answers: [
          { id: 'l20-q16-a1', text: 'Fondamentale per sviluppo fisico e cognitivo', isCorrect: true },
          { id: 'l20-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q16-a3', text: 'Solo per sopravvivenza', isCorrect: false },
          { id: 'l20-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q17',
        lessonId: 20,
        questionNumber: 17,
        text: 'Cosa significa medicina dell\'età evolutiva?',
        answers: [
          { id: 'l20-q17-a1', text: 'Medicina che studia sviluppo dalla nascita all\'adolescenza', isCorrect: true },
          { id: 'l20-q17-a2', text: 'Medicina solo neonatale', isCorrect: false },
          { id: 'l20-q17-a3', text: 'Medicina solo pediatrica', isCorrect: false },
          { id: 'l20-q17-a4', text: 'Medicina degli adulti', isCorrect: false }
        ]
      },
      {
        id: 'l20-q18',
        lessonId: 20,
        questionNumber: 18,
        text: 'Quale è l\'importanza dell\'igiene nel bambino?',
        answers: [
          { id: 'l20-q18-a1', text: 'Fondamentale per prevenzione infezioni e benessere', isCorrect: true },
          { id: 'l20-q18-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q18-a3', text: 'Solo estetica', isCorrect: false },
          { id: 'l20-q18-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q19',
        lessonId: 20,
        questionNumber: 19,
        text: 'Cosa significa approccio olistico al bambino?',
        answers: [
          { id: 'l20-q19-a1', text: 'Approccio che considera tutte le dimensioni del bambino', isCorrect: true },
          { id: 'l20-q19-a2', text: 'Approccio solo fisico', isCorrect: false },
          { id: 'l20-q19-a3', text: 'Approccio solo psicologico', isCorrect: false },
          { id: 'l20-q19-a4', text: 'Approccio solo sociale', isCorrect: false }
        ]
      },
      {
        id: 'l20-q20',
        lessonId: 20,
        questionNumber: 20,
        text: 'Quale è l\'importanza del rispetto dei diritti fondamentali dei minori?',
        answers: [
          { id: 'l20-q20-a1', text: 'Fondamentale per protezione, benessere, sviluppo', isCorrect: true },
          { id: 'l20-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l20-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l20-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  private createOncologicalQuestions(): Question[] {
    return [
      {
        id: 'l21-q1',
        lessonId: 21,
        questionNumber: 1,
        text: 'Cosa significa assistenza oncologica?',
        answers: [
          { id: 'l21-q1-a1', text: 'Assistenza al paziente con tumore', isCorrect: true },
          { id: 'l21-q1-a2', text: 'Assistenza solo chirurgica', isCorrect: false },
          { id: 'l21-q1-a3', text: 'Assistenza solo medica', isCorrect: false },
          { id: 'l21-q1-a4', text: 'Assistenza generica', isCorrect: false }
        ]
      },
      {
        id: 'l21-q2',
        lessonId: 21,
        questionNumber: 2,
        text: 'Cosa significa cure palliative?',
        answers: [
          { id: 'l21-q2-a1', text: 'Cure per migliorare qualità di vita in malattia grave', isCorrect: true },
          { id: 'l21-q2-a2', text: 'Cure curative', isCorrect: false },
          { id: 'l21-q2-a3', text: 'Cure preventive', isCorrect: false },
          { id: 'l21-q2-a4', text: 'Cure chirurgiche', isCorrect: false }
        ]
      },
      {
        id: 'l21-q3',
        lessonId: 21,
        questionNumber: 3,
        text: 'Quale è l\'importanza della comunicazione nella malattia oncologica?',
        answers: [
          { id: 'l21-q3-a1', text: 'Fondamentale per supporto, informazione, relazione terapeutica', isCorrect: true },
          { id: 'l21-q3-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q3-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q3-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q4',
        lessonId: 21,
        questionNumber: 4,
        text: 'Cosa significa gestione del fine vita?',
        answers: [
          { id: 'l21-q4-a1', text: 'Assistenza nella fase terminale della malattia', isCorrect: true },
          { id: 'l21-q4-a2', text: 'Assistenza iniziale', isCorrect: false },
          { id: 'l21-q4-a3', text: 'Assistenza intermedia', isCorrect: false },
          { id: 'l21-q4-a4', text: 'Assistenza preventiva', isCorrect: false }
        ]
      },
      {
        id: 'l21-q5',
        lessonId: 21,
        questionNumber: 5,
        text: 'Cosa significa supporto integrato?',
        answers: [
          { id: 'l21-q5-a1', text: 'Supporto ospedaliero e domiciliare coordinato', isCorrect: true },
          { id: 'l21-q5-a2', text: 'Solo ospedaliero', isCorrect: false },
          { id: 'l21-q5-a3', text: 'Solo domiciliare', isCorrect: false },
          { id: 'l21-q5-a4', text: 'Supporto separato', isCorrect: false }
        ]
      },
      {
        id: 'l21-q6',
        lessonId: 21,
        questionNumber: 6,
        text: 'Quale è l\'importanza degli aspetti relazionali?',
        answers: [
          { id: 'l21-q6-a1', text: 'Fondamentale per benessere psicologico e supporto', isCorrect: true },
          { id: 'l21-q6-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q6-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q6-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q7',
        lessonId: 21,
        questionNumber: 7,
        text: 'Cosa significa preparazione della salma?',
        answers: [
          { id: 'l21-q7-a1', text: 'Preparazione del corpo dopo il decesso', isCorrect: true },
          { id: 'l21-q7-a2', text: 'Preparazione per intervento', isCorrect: false },
          { id: 'l21-q7-a3', text: 'Preparazione per esame', isCorrect: false },
          { id: 'l21-q7-a4', text: 'Preparazione per dimissione', isCorrect: false }
        ]
      },
      {
        id: 'l21-q8',
        lessonId: 21,
        questionNumber: 8,
        text: 'Quale è l\'importanza della gestione del dolore oncologico?',
        answers: [
          { id: 'l21-q8-a1', text: 'Fondamentale per qualità di vita e benessere', isCorrect: true },
          { id: 'l21-q8-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q8-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q8-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q9',
        lessonId: 21,
        questionNumber: 9,
        text: 'Cosa significa supporto psicologico?',
        answers: [
          { id: 'l21-q9-a1', text: 'Supporto emotivo e psicologico al paziente e famiglia', isCorrect: true },
          { id: 'l21-q9-a2', text: 'Solo al paziente', isCorrect: false },
          { id: 'l21-q9-a3', text: 'Solo alla famiglia', isCorrect: false },
          { id: 'l21-q9-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l21-q10',
        lessonId: 21,
        questionNumber: 10,
        text: 'Quale è l\'importanza della continuità assistenziale?',
        answers: [
          { id: 'l21-q10-a1', text: 'Fondamentale per qualità di vita e supporto continuo', isCorrect: true },
          { id: 'l21-q10-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q10-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q10-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q11',
        lessonId: 21,
        questionNumber: 11,
        text: 'Cosa significa assistenza domiciliare oncologica?',
        answers: [
          { id: 'l21-q11-a1', text: 'Assistenza oncologica fornita al domicilio', isCorrect: true },
          { id: 'l21-q11-a2', text: 'Assistenza solo ospedaliera', isCorrect: false },
          { id: 'l21-q11-a3', text: 'Assistenza solo ambulatoriale', isCorrect: false },
          { id: 'l21-q11-a4', text: 'Assistenza generica', isCorrect: false }
        ]
      },
      {
        id: 'l21-q12',
        lessonId: 21,
        questionNumber: 12,
        text: 'Quale è l\'importanza del supporto alla famiglia?',
        answers: [
          { id: 'l21-q12-a1', text: 'Fondamentale per supporto emotivo e pratico', isCorrect: true },
          { id: 'l21-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q13',
        lessonId: 21,
        questionNumber: 13,
        text: 'Cosa significa gestione dei sintomi?',
        answers: [
          { id: 'l21-q13-a1', text: 'Controllo e gestione dei sintomi della malattia', isCorrect: true },
          { id: 'l21-q13-a2', text: 'Solo controllo dolore', isCorrect: false },
          { id: 'l21-q13-a3', text: 'Solo controllo nausea', isCorrect: false },
          { id: 'l21-q13-a4', text: 'Nessun controllo', isCorrect: false }
        ]
      },
      {
        id: 'l21-q14',
        lessonId: 21,
        questionNumber: 14,
        text: 'Quale è l\'importanza della dignità nella fase terminale?',
        answers: [
          { id: 'l21-q14-a1', text: 'Fondamentale per rispetto e qualità di vita', isCorrect: true },
          { id: 'l21-q14-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q14-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q14-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q15',
        lessonId: 21,
        questionNumber: 15,
        text: 'Cosa significa approccio olistico al paziente oncologico?',
        answers: [
          { id: 'l21-q15-a1', text: 'Approccio che considera tutte le dimensioni della persona', isCorrect: true },
          { id: 'l21-q15-a2', text: 'Approccio solo fisico', isCorrect: false },
          { id: 'l21-q15-a3', text: 'Approccio solo psicologico', isCorrect: false },
          { id: 'l21-q15-a4', text: 'Approccio solo sociale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q16',
        lessonId: 21,
        questionNumber: 16,
        text: 'Quale è l\'importanza della comunicazione della diagnosi?',
        answers: [
          { id: 'l21-q16-a1', text: 'Fondamentale per informazione, supporto, relazione', isCorrect: true },
          { id: 'l21-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q16-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q17',
        lessonId: 21,
        questionNumber: 17,
        text: 'Cosa significa supporto spirituale?',
        answers: [
          { id: 'l21-q17-a1', text: 'Supporto alle esigenze spirituali e religiose', isCorrect: true },
          { id: 'l21-q17-a2', text: 'Solo supporto religioso', isCorrect: false },
          { id: 'l21-q17-a3', text: 'Solo supporto psicologico', isCorrect: false },
          { id: 'l21-q17-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l21-q18',
        lessonId: 21,
        questionNumber: 18,
        text: 'Quale è l\'importanza della gestione degli effetti collaterali?',
        answers: [
          { id: 'l21-q18-a1', text: 'Fondamentale per qualità di vita e aderenza terapeutica', isCorrect: true },
          { id: 'l21-q18-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q18-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q18-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l21-q19',
        lessonId: 21,
        questionNumber: 19,
        text: 'Cosa significa assistenza multidisciplinare?',
        answers: [
          { id: 'l21-q19-a1', text: 'Assistenza coordinata di più professionisti', isCorrect: true },
          { id: 'l21-q19-a2', text: 'Assistenza solo medica', isCorrect: false },
          { id: 'l21-q19-a3', text: 'Assistenza solo infermieristica', isCorrect: false },
          { id: 'l21-q19-a4', text: 'Assistenza separata', isCorrect: false }
        ]
      },
      {
        id: 'l21-q20',
        lessonId: 21,
        questionNumber: 20,
        text: 'Quale è l\'importanza del rispetto della volontà del paziente?',
        answers: [
          { id: 'l21-q20-a1', text: 'Fondamentale per autonomia e dignità', isCorrect: true },
          { id: 'l21-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l21-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l21-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  private createDisabilityQuestions(): Question[] {
    return [
      {
        id: 'l22-q1',
        lessonId: 22,
        questionNumber: 1,
        text: 'Cosa significa disabilità?',
        answers: [
          { id: 'l22-q1-a1', text: 'Condizione che limita attività e partecipazione', isCorrect: true },
          { id: 'l22-q1-a2', text: 'Malattia', isCorrect: false },
          { id: 'l22-q1-a3', text: 'Incapacità totale', isCorrect: false },
          { id: 'l22-q1-a4', text: 'Stato normale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q2',
        lessonId: 22,
        questionNumber: 2,
        text: 'Quale legge regola i diritti delle persone con disabilità?',
        answers: [
          { id: 'l22-q2-a1', text: 'Legge 104/1992', isCorrect: true },
          { id: 'l22-q2-a2', text: 'Legge 833/1978', isCorrect: false },
          { id: 'l22-q2-a3', text: 'Legge 81/2008', isCorrect: false },
          { id: 'l22-q2-a4', text: 'Legge 196/2003', isCorrect: false }
        ]
      },
      {
        id: 'l22-q3',
        lessonId: 22,
        questionNumber: 3,
        text: 'Cosa significa inclusione?',
        answers: [
          { id: 'l22-q3-a1', text: 'Processo di integrazione e partecipazione sociale', isCorrect: true },
          { id: 'l22-q3-a2', text: 'Separazione', isCorrect: false },
          { id: 'l22-q3-a3', text: 'Isolamento', isCorrect: false },
          { id: 'l22-q3-a4', text: 'Esclusione', isCorrect: false }
        ]
      },
      {
        id: 'l22-q4',
        lessonId: 22,
        questionNumber: 4,
        text: 'Cosa significa assistenza al paziente psichiatrico?',
        answers: [
          { id: 'l22-q4-a1', text: 'Assistenza a persone con disturbi mentali', isCorrect: true },
          { id: 'l22-q4-a2', text: 'Assistenza solo fisica', isCorrect: false },
          { id: 'l22-q4-a3', text: 'Assistenza solo medica', isCorrect: false },
          { id: 'l22-q4-a4', text: 'Assistenza generica', isCorrect: false }
        ]
      },
      {
        id: 'l22-q5',
        lessonId: 22,
        questionNumber: 5,
        text: 'Quale è l\'importanza dell\'approccio non giudicante?',
        answers: [
          { id: 'l22-q5-a1', text: 'Fondamentale per relazione di fiducia e supporto', isCorrect: true },
          { id: 'l22-q5-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q5-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q5-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q6',
        lessonId: 22,
        questionNumber: 6,
        text: 'Cosa significa bisogni speciali?',
        answers: [
          { id: 'l22-q6-a1', text: 'Bisogni specifici di persone con disabilità o condizioni particolari', isCorrect: true },
          { id: 'l22-q6-a2', text: 'Bisogni normali', isCorrect: false },
          { id: 'l22-q6-a3', text: 'Bisogni comuni', isCorrect: false },
          { id: 'l22-q6-a4', text: 'Bisogni generici', isCorrect: false }
        ]
      },
      {
        id: 'l22-q7',
        lessonId: 22,
        questionNumber: 7,
        text: 'Cosa significa servizi territoriali?',
        answers: [
          { id: 'l22-q7-a1', text: 'Servizi forniti sul territorio (domicilio, centri)', isCorrect: true },
          { id: 'l22-q7-a2', text: 'Servizi solo ospedalieri', isCorrect: false },
          { id: 'l22-q7-a3', text: 'Servizi solo ambulatoriali', isCorrect: false },
          { id: 'l22-q7-a4', text: 'Servizi generici', isCorrect: false }
        ]
      },
      {
        id: 'l22-q8',
        lessonId: 22,
        questionNumber: 8,
        text: 'Cosa significa servizi residenziali?',
        answers: [
          { id: 'l22-q8-a1', text: 'Servizi in strutture residenziali', isCorrect: true },
          { id: 'l22-q8-a2', text: 'Servizi domiciliari', isCorrect: false },
          { id: 'l22-q8-a3', text: 'Servizi ospedalieri', isCorrect: false },
          { id: 'l22-q8-a4', text: 'Servizi ambulatoriali', isCorrect: false }
        ]
      },
      {
        id: 'l22-q9',
        lessonId: 22,
        questionNumber: 9,
        text: 'Cosa significa servizi semiresidenziali?',
        answers: [
          { id: 'l22-q9-a1', text: 'Servizi diurni in strutture', isCorrect: true },
          { id: 'l22-q9-a2', text: 'Servizi notturni', isCorrect: false },
          { id: 'l22-q9-a3', text: 'Servizi continuativi', isCorrect: false },
          { id: 'l22-q9-a4', text: 'Servizi ospedalieri', isCorrect: false }
        ]
      },
      {
        id: 'l22-q10',
        lessonId: 22,
        questionNumber: 10,
        text: 'Quale è l\'importanza dell\'autonomia?',
        answers: [
          { id: 'l22-q10-a1', text: 'Fondamentale per dignità e qualità di vita', isCorrect: true },
          { id: 'l22-q10-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q10-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q10-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q11',
        lessonId: 22,
        questionNumber: 11,
        text: 'Cosa significa salute mentale?',
        answers: [
          { id: 'l22-q11-a1', text: 'Stato di benessere psicologico, emotivo e sociale', isCorrect: true },
          { id: 'l22-q11-a2', text: 'Solo assenza di malattia', isCorrect: false },
          { id: 'l22-q11-a3', text: 'Solo benessere fisico', isCorrect: false },
          { id: 'l22-q11-a4', text: 'Solo benessere sociale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q12',
        lessonId: 22,
        questionNumber: 12,
        text: 'Quale è l\'importanza del supporto alla famiglia?',
        answers: [
          { id: 'l22-q12-a1', text: 'Fondamentale per supporto emotivo e pratico', isCorrect: true },
          { id: 'l22-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q13',
        lessonId: 22,
        questionNumber: 13,
        text: 'Cosa significa interventi dedicati?',
        answers: [
          { id: 'l22-q13-a1', text: 'Interventi specifici per bisogni particolari', isCorrect: true },
          { id: 'l22-q13-a2', text: 'Interventi generici', isCorrect: false },
          { id: 'l22-q13-a3', text: 'Interventi standard', isCorrect: false },
          { id: 'l22-q13-a4', text: 'Interventi comuni', isCorrect: false }
        ]
      },
      {
        id: 'l22-q14',
        lessonId: 22,
        questionNumber: 14,
        text: 'Quale è l\'importanza della domiciliarità?',
        answers: [
          { id: 'l22-q14-a1', text: 'Fondamentale per mantenere persona nel proprio ambiente', isCorrect: true },
          { id: 'l22-q14-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q14-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q14-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q15',
        lessonId: 22,
        questionNumber: 15,
        text: 'Cosa significa approccio personalizzato?',
        answers: [
          { id: 'l22-q15-a1', text: 'Approccio adattato alle esigenze specifiche', isCorrect: true },
          { id: 'l22-q15-a2', text: 'Approccio standard', isCorrect: false },
          { id: 'l22-q15-a3', text: 'Approccio generico', isCorrect: false },
          { id: 'l22-q15-a4', text: 'Approccio comune', isCorrect: false }
        ]
      },
      {
        id: 'l22-q16',
        lessonId: 22,
        questionNumber: 16,
        text: 'Quale è l\'importanza del rispetto dei diritti?',
        answers: [
          { id: 'l22-q16-a1', text: 'Fondamentale per dignità e inclusione', isCorrect: true },
          { id: 'l22-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q16-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q17',
        lessonId: 22,
        questionNumber: 17,
        text: 'Cosa significa supporto alla comunicazione?',
        answers: [
          { id: 'l22-q17-a1', text: 'Supporto per facilitare comunicazione efficace', isCorrect: true },
          { id: 'l22-q17-a2', text: 'Solo comunicazione verbale', isCorrect: false },
          { id: 'l22-q17-a3', text: 'Solo comunicazione scritta', isCorrect: false },
          { id: 'l22-q17-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l22-q18',
        lessonId: 22,
        questionNumber: 18,
        text: 'Quale è l\'importanza della formazione continua?',
        answers: [
          { id: 'l22-q18-a1', text: 'Fondamentale per competenze e qualità assistenziale', isCorrect: true },
          { id: 'l22-q18-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q18-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q18-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l22-q19',
        lessonId: 22,
        questionNumber: 19,
        text: 'Cosa significa approccio multidisciplinare?',
        answers: [
          { id: 'l22-q19-a1', text: 'Approccio coordinato di più professionisti', isCorrect: true },
          { id: 'l22-q19-a2', text: 'Approccio solo medico', isCorrect: false },
          { id: 'l22-q19-a3', text: 'Approccio solo infermieristico', isCorrect: false },
          { id: 'l22-q19-a4', text: 'Approccio separato', isCorrect: false }
        ]
      },
      {
        id: 'l22-q20',
        lessonId: 22,
        questionNumber: 20,
        text: 'Quale è l\'importanza della promozione dell\'autonomia?',
        answers: [
          { id: 'l22-q20-a1', text: 'Fondamentale per dignità, indipendenza, qualità di vita', isCorrect: true },
          { id: 'l22-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l22-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l22-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  private createIntensiveCareQuestions(): Question[] {
    return [
      {
        id: 'l23-q1',
        lessonId: 23,
        questionNumber: 1,
        text: 'Cosa significa terapia intensiva?',
        answers: [
          { id: 'l23-q1-a1', text: 'Assistenza a pazienti critici con monitoraggio continuo', isCorrect: true },
          { id: 'l23-q1-a2', text: 'Assistenza generica', isCorrect: false },
          { id: 'l23-q1-a3', text: 'Assistenza ambulatoriale', isCorrect: false },
          { id: 'l23-q1-a4', text: 'Assistenza domiciliare', isCorrect: false }
        ]
      },
      {
        id: 'l23-q2',
        lessonId: 23,
        questionNumber: 2,
        text: 'Quale è il ruolo dell\'OSS in terapia intensiva?',
        answers: [
          { id: 'l23-q2-a1', text: 'Supporto assistenziale di base sotto supervisione', isCorrect: true },
          { id: 'l23-q2-a2', text: 'Gestione autonoma', isCorrect: false },
          { id: 'l23-q2-a3', text: 'Solo osservazione', isCorrect: false },
          { id: 'l23-q2-a4', text: 'Nessun ruolo', isCorrect: false }
        ]
      },
      {
        id: 'l23-q3',
        lessonId: 23,
        questionNumber: 3,
        text: 'Cosa significa area critica?',
        answers: [
          { id: 'l23-q3-a1', text: 'Area per pazienti con condizioni critiche', isCorrect: true },
          { id: 'l23-q3-a2', text: 'Area generica', isCorrect: false },
          { id: 'l23-q3-a3', text: 'Area ambulatoriale', isCorrect: false },
          { id: 'l23-q3-a4', text: 'Area domiciliare', isCorrect: false }
        ]
      },
      {
        id: 'l23-q4',
        lessonId: 23,
        questionNumber: 4,
        text: 'Quale è l\'importanza del monitoraggio continuo?',
        answers: [
          { id: 'l23-q4-a1', text: 'Fondamentale per rilevare precocemente alterazioni', isCorrect: true },
          { id: 'l23-q4-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q4-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q4-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q5',
        lessonId: 23,
        questionNumber: 5,
        text: 'Cosa significa ventilazione meccanica?',
        answers: [
          { id: 'l23-q5-a1', text: 'Supporto respiratorio mediante apparecchiatura', isCorrect: true },
          { id: 'l23-q5-a2', text: 'Respirazione spontanea', isCorrect: false },
          { id: 'l23-q5-a3', text: 'Respirazione assistita manuale', isCorrect: false },
          { id: 'l23-q5-a4', text: 'Respirazione normale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q6',
        lessonId: 23,
        questionNumber: 6,
        text: 'Quale è l\'importanza dell\'igiene in terapia intensiva?',
        answers: [
          { id: 'l23-q6-a1', text: 'Fondamentale per prevenzione infezioni', isCorrect: true },
          { id: 'l23-q6-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q6-a3', text: 'Solo estetica', isCorrect: false },
          { id: 'l23-q6-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q7',
        lessonId: 23,
        questionNumber: 7,
        text: 'Cosa significa supporto emodinamico?',
        answers: [
          { id: 'l23-q7-a1', text: 'Supporto alla circolazione sanguigna', isCorrect: true },
          { id: 'l23-q7-a2', text: 'Supporto respiratorio', isCorrect: false },
          { id: 'l23-q7-a3', text: 'Supporto nutrizionale', isCorrect: false },
          { id: 'l23-q7-a4', text: 'Supporto neurologico', isCorrect: false }
        ]
      },
      {
        id: 'l23-q8',
        lessonId: 23,
        questionNumber: 8,
        text: 'Quale è l\'importanza della documentazione?',
        answers: [
          { id: 'l23-q8-a1', text: 'Fondamentale per continuità e sicurezza assistenziale', isCorrect: true },
          { id: 'l23-q8-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q8-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q8-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q9',
        lessonId: 23,
        questionNumber: 9,
        text: 'Cosa significa supporto multiorgano?',
        answers: [
          { id: 'l23-q9-a1', text: 'Supporto a più organi contemporaneamente', isCorrect: true },
          { id: 'l23-q9-a2', text: 'Supporto a un solo organo', isCorrect: false },
          { id: 'l23-q9-a3', text: 'Supporto parziale', isCorrect: false },
          { id: 'l23-q9-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l23-q10',
        lessonId: 23,
        questionNumber: 10,
        text: 'Quale è l\'importanza della comunicazione con la famiglia?',
        answers: [
          { id: 'l23-q10-a1', text: 'Fondamentale per informazione e supporto', isCorrect: true },
          { id: 'l23-q10-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q10-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q10-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q11',
        lessonId: 23,
        questionNumber: 11,
        text: 'Cosa significa assistenza in area critica?',
        answers: [
          { id: 'l23-q11-a1', text: 'Assistenza a pazienti con condizioni critiche', isCorrect: true },
          { id: 'l23-q11-a2', text: 'Assistenza generica', isCorrect: false },
          { id: 'l23-q11-a3', text: 'Assistenza ambulatoriale', isCorrect: false },
          { id: 'l23-q11-a4', text: 'Assistenza domiciliare', isCorrect: false }
        ]
      },
      {
        id: 'l23-q12',
        lessonId: 23,
        questionNumber: 12,
        text: 'Quale è l\'importanza della prevenzione delle complicanze?',
        answers: [
          { id: 'l23-q12-a1', text: 'Fondamentale per migliorare outcome', isCorrect: true },
          { id: 'l23-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q13',
        lessonId: 23,
        questionNumber: 13,
        text: 'Cosa significa competenze OSS in terapia intensiva?',
        answers: [
          { id: 'l23-q13-a1', text: 'Competenze di base adattate all\'area critica', isCorrect: true },
          { id: 'l23-q13-a2', text: 'Competenze avanzate', isCorrect: false },
          { id: 'l23-q13-a3', text: 'Competenze mediche', isCorrect: false },
          { id: 'l23-q13-a4', text: 'Nessuna competenza', isCorrect: false }
        ]
      },
      {
        id: 'l23-q14',
        lessonId: 23,
        questionNumber: 14,
        text: 'Quale è l\'importanza del lavoro di equipe?',
        answers: [
          { id: 'l23-q14-a1', text: 'Fondamentale per assistenza efficace e sicura', isCorrect: true },
          { id: 'l23-q14-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q14-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q14-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q15',
        lessonId: 23,
        questionNumber: 15,
        text: 'Cosa significa gestione delle apparecchiature?',
        answers: [
          { id: 'l23-q15-a1', text: 'Conoscenza base, segnalazione malfunzionamenti, supporto', isCorrect: true },
          { id: 'l23-q15-a2', text: 'Solo conoscenza', isCorrect: false },
          { id: 'l23-q15-a3', text: 'Solo manutenzione', isCorrect: false },
          { id: 'l23-q15-a4', text: 'Nessuna gestione', isCorrect: false }
        ]
      },
      {
        id: 'l23-q16',
        lessonId: 23,
        questionNumber: 16,
        text: 'Quale è l\'importanza della sicurezza del paziente?',
        answers: [
          { id: 'l23-q16-a1', text: 'Massima priorità in area critica', isCorrect: true },
          { id: 'l23-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q16-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l23-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q17',
        lessonId: 23,
        questionNumber: 17,
        text: 'Cosa significa supporto alla famiglia in terapia intensiva?',
        answers: [
          { id: 'l23-q17-a1', text: 'Informazione, supporto emotivo, presenza', isCorrect: true },
          { id: 'l23-q17-a2', text: 'Solo informazione', isCorrect: false },
          { id: 'l23-q17-a3', text: 'Solo supporto emotivo', isCorrect: false },
          { id: 'l23-q17-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l23-q18',
        lessonId: 23,
        questionNumber: 18,
        text: 'Cosa significa ventilazione meccanica?',
        answers: [
          { id: 'l23-q18-a1', text: 'Supporto respiratorio mediante apparecchiatura', isCorrect: true },
          { id: 'l23-q18-a2', text: 'Respirazione spontanea', isCorrect: false },
          { id: 'l23-q18-a3', text: 'Ossigenoterapia semplice', isCorrect: false },
          { id: 'l23-q18-a4', text: 'Fisioterapia respiratoria', isCorrect: false }
        ]
      },
      {
        id: 'l23-q19',
        lessonId: 23,
        questionNumber: 19,
        text: 'Quale è l\'importanza del monitoraggio continuo?',
        answers: [
          { id: 'l23-q19-a1', text: 'Rilevazione precoce di alterazioni, intervento tempestivo', isCorrect: true },
          { id: 'l23-q19-a2', text: 'Solo documentazione', isCorrect: false },
          { id: 'l23-q19-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l23-q19-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l23-q20',
        lessonId: 23,
        questionNumber: 20,
        text: 'Cosa significa assistenza in area critica?',
        answers: [
          { id: 'l23-q20-a1', text: 'Assistenza a pazienti con condizioni potenzialmente letali', isCorrect: true },
          { id: 'l23-q20-a2', text: 'Assistenza generica', isCorrect: false },
          { id: 'l23-q20-a3', text: 'Assistenza ambulatoriale', isCorrect: false },
          { id: 'l23-q20-a4', text: 'Assistenza domiciliare', isCorrect: false }
        ]
      }
    ];
  }

  private createWasteManagementQuestions(): Question[] {
    return [
      {
        id: 'l24-q1',
        lessonId: 24,
        questionNumber: 1,
        text: 'Quale è la classificazione dei rifiuti sanitari?',
        answers: [
          { id: 'l24-q1-a1', text: 'Urbani, speciali non pericolosi, pericolosi', isCorrect: true },
          { id: 'l24-q1-a2', text: 'Solo urbani', isCorrect: false },
          { id: 'l24-q1-a3', text: 'Solo pericolosi', isCorrect: false },
          { id: 'l24-q1-a4', text: 'Tutti uguali', isCorrect: false }
        ]
      },
      {
        id: 'l24-q2',
        lessonId: 24,
        questionNumber: 2,
        text: 'Quale è il colore del contenitore per rifiuti a rischio infettivo?',
        answers: [
          { id: 'l24-q2-a1', text: 'Giallo', isCorrect: true },
          { id: 'l24-q2-a2', text: 'Rosso', isCorrect: false },
          { id: 'l24-q2-a3', text: 'Blu', isCorrect: false },
          { id: 'l24-q2-a4', text: 'Verde', isCorrect: false }
        ]
      },
      {
        id: 'l24-q3',
        lessonId: 24,
        questionNumber: 3,
        text: 'Quale è il colore del contenitore per rifiuti urbani?',
        answers: [
          { id: 'l24-q3-a1', text: 'Nero o grigio', isCorrect: true },
          { id: 'l24-q3-a2', text: 'Giallo', isCorrect: false },
          { id: 'l24-q3-a3', text: 'Blu', isCorrect: false },
          { id: 'l24-q3-a4', text: 'Verde', isCorrect: false }
        ]
      },
      {
        id: 'l24-q4',
        lessonId: 24,
        questionNumber: 4,
        text: 'Cosa significa rifiuto a rischio infettivo?',
        answers: [
          { id: 'l24-q4-a1', text: 'Rifiuto che può contenere agenti patogeni', isCorrect: true },
          { id: 'l24-q4-a2', text: 'Rifiuto normale', isCorrect: false },
          { id: 'l24-q4-a3', text: 'Rifiuto riciclabile', isCorrect: false },
          { id: 'l24-q4-a4', text: 'Rifiuto organico', isCorrect: false }
        ]
      },
      {
        id: 'l24-q5',
        lessonId: 24,
        questionNumber: 5,
        text: 'Quali rifiuti vanno nel contenitore giallo?',
        answers: [
          { id: 'l24-q5-a1', text: 'Materiali a rischio infettivo (guanti, siringhe, garze usate)', isCorrect: true },
          { id: 'l24-q5-a2', text: 'Rifiuti urbani', isCorrect: false },
          { id: 'l24-q5-a3', text: 'Rifiuti riciclabili', isCorrect: false },
          { id: 'l24-q5-a4', text: 'Rifiuti organici', isCorrect: false }
        ]
      },
      {
        id: 'l24-q6',
        lessonId: 24,
        questionNumber: 6,
        text: 'Cosa significa gestione dei rifiuti?',
        answers: [
          { id: 'l24-q6-a1', text: 'Raccolta, trasporto, smaltimento appropriato', isCorrect: true },
          { id: 'l24-q6-a2', text: 'Solo raccolta', isCorrect: false },
          { id: 'l24-q6-a3', text: 'Solo smaltimento', isCorrect: false },
          { id: 'l24-q6-a4', text: 'Nessuna gestione', isCorrect: false }
        ]
      },
      {
        id: 'l24-q7',
        lessonId: 24,
        questionNumber: 7,
        text: 'Quale è l\'importanza della corretta gestione dei rifiuti?',
        answers: [
          { id: 'l24-q7-a1', text: 'Protezione salute, ambiente, conformità normativa', isCorrect: true },
          { id: 'l24-q7-a2', text: 'Solo conformità', isCorrect: false },
          { id: 'l24-q7-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l24-q7-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l24-q8',
        lessonId: 24,
        questionNumber: 8,
        text: 'Cosa significa sterilizzazione?',
        answers: [
          { id: 'l24-q8-a1', text: 'Eliminazione di tutti i microrganismi', isCorrect: true },
          { id: 'l24-q8-a2', text: 'Riduzione dei microrganismi', isCorrect: false },
          { id: 'l24-q8-a3', text: 'Solo pulizia', isCorrect: false },
          { id: 'l24-q8-a4', text: 'Solo disinfezione', isCorrect: false }
        ]
      },
      {
        id: 'l24-q9',
        lessonId: 24,
        questionNumber: 9,
        text: 'Quale è la funzione dell\'autoclave?',
        answers: [
          { id: 'l24-q9-a1', text: 'Sterilizzazione mediante vapore ad alta pressione', isCorrect: true },
          { id: 'l24-q9-a2', text: 'Solo disinfezione', isCorrect: false },
          { id: 'l24-q9-a3', text: 'Solo pulizia', isCorrect: false },
          { id: 'l24-q9-a4', text: 'Solo riscaldamento', isCorrect: false }
        ]
      },
      {
        id: 'l24-q10',
        lessonId: 24,
        questionNumber: 10,
        text: 'Cosa significa ricondizionamento dei dispositivi?',
        answers: [
          { id: 'l24-q10-a1', text: 'Processo di pulizia, disinfezione e sterilizzazione', isCorrect: true },
          { id: 'l24-q10-a2', text: 'Solo pulizia', isCorrect: false },
          { id: 'l24-q10-a3', text: 'Solo disinfezione', isCorrect: false },
          { id: 'l24-q10-a4', text: 'Solo sterilizzazione', isCorrect: false }
        ]
      },
      {
        id: 'l24-q11',
        lessonId: 24,
        questionNumber: 11,
        text: 'Quale è la temperatura di sterilizzazione in autoclave?',
        answers: [
          { id: 'l24-q11-a1', text: '121-134°C', isCorrect: true },
          { id: 'l24-q11-a2', text: '100°C', isCorrect: false },
          { id: 'l24-q11-a3', text: '80°C', isCorrect: false },
          { id: 'l24-q11-a4', text: '60°C', isCorrect: false }
        ]
      },
      {
        id: 'l24-q12',
        lessonId: 24,
        questionNumber: 12,
        text: 'Cosa significa DPI monouso?',
        answers: [
          { id: 'l24-q12-a1', text: 'Dispositivo di protezione individuale da usare una sola volta', isCorrect: true },
          { id: 'l24-q12-a2', text: 'Dispositivo riutilizzabile', isCorrect: false },
          { id: 'l24-q12-a3', text: 'Dispositivo permanente', isCorrect: false },
          { id: 'l24-q12-a4', text: 'Dispositivo opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l24-q13',
        lessonId: 24,
        questionNumber: 13,
        text: 'Quale è la procedura corretta per lo smaltimento di siringhe?',
        answers: [
          { id: 'l24-q13-a1', text: 'Contenitore giallo, senza riappiccare il cappuccio', isCorrect: true },
          { id: 'l24-q13-a2', text: 'Contenitore normale', isCorrect: false },
          { id: 'l24-q13-a3', text: 'Riappicare il cappuccio', isCorrect: false },
          { id: 'l24-q13-a4', text: 'Buttare nel lavandino', isCorrect: false }
        ]
      },
      {
        id: 'l24-q14',
        lessonId: 24,
        questionNumber: 14,
        text: 'Cosa significa rifiuto chimico pericoloso?',
        answers: [
          { id: 'l24-q14-a1', text: 'Rifiuto contenente sostanze chimiche pericolose', isCorrect: true },
          { id: 'l24-q14-a2', text: 'Rifiuto normale', isCorrect: false },
          { id: 'l24-q14-a3', text: 'Rifiuto riciclabile', isCorrect: false },
          { id: 'l24-q14-a4', text: 'Rifiuto organico', isCorrect: false }
        ]
      },
      {
        id: 'l24-q15',
        lessonId: 24,
        questionNumber: 15,
        text: 'Cosa significa rifiuto radioattivo?',
        answers: [
          { id: 'l24-q15-a1', text: 'Rifiuto contenente materiali radioattivi', isCorrect: true },
          { id: 'l24-q15-a2', text: 'Rifiuto normale', isCorrect: false },
          { id: 'l24-q15-a3', text: 'Rifiuto chimico', isCorrect: false },
          { id: 'l24-q15-a4', text: 'Rifiuto infettivo', isCorrect: false }
        ]
      },
      {
        id: 'l24-q16',
        lessonId: 24,
        questionNumber: 16,
        text: 'Quale è l\'importanza della tracciabilità dei rifiuti?',
        answers: [
          { id: 'l24-q16-a1', text: 'Controllo, sicurezza, conformità normativa', isCorrect: true },
          { id: 'l24-q16-a2', text: 'Solo controllo', isCorrect: false },
          { id: 'l24-q16-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l24-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l24-q17',
        lessonId: 24,
        questionNumber: 17,
        text: 'Cosa significa smaltimento appropriato?',
        answers: [
          { id: 'l24-q17-a1', text: 'Smaltimento secondo normativa e tipo di rifiuto', isCorrect: true },
          { id: 'l24-q17-a2', text: 'Smaltimento generico', isCorrect: false },
          { id: 'l24-q17-a3', text: 'Smaltimento casuale', isCorrect: false },
          { id: 'l24-q17-a4', text: 'Nessuno smaltimento', isCorrect: false }
        ]
      },
      {
        id: 'l24-q18',
        lessonId: 24,
        questionNumber: 18,
        text: 'Quale è la responsabilità dell\'OSS nella gestione rifiuti?',
        answers: [
          { id: 'l24-q18-a1', text: 'Corretta separazione, uso contenitori appropriati, segnalazione problemi', isCorrect: true },
          { id: 'l24-q18-a2', text: 'Solo separazione', isCorrect: false },
          { id: 'l24-q18-a3', text: 'Nessuna responsabilità', isCorrect: false },
          { id: 'l24-q18-a4', text: 'Solo smaltimento', isCorrect: false }
        ]
      },
      {
        id: 'l24-q19',
        lessonId: 24,
        questionNumber: 19,
        text: 'Cosa significa decontaminazione?',
        answers: [
          { id: 'l24-q19-a1', text: 'Rimozione o inattivazione di agenti patogeni', isCorrect: true },
          { id: 'l24-q19-a2', text: 'Solo pulizia', isCorrect: false },
          { id: 'l24-q19-a3', text: 'Solo sterilizzazione', isCorrect: false },
          { id: 'l24-q19-a4', text: 'Solo disinfezione', isCorrect: false }
        ]
      },
      {
        id: 'l24-q20',
        lessonId: 24,
        questionNumber: 20,
        text: 'Quale è l\'importanza della formazione sulla gestione rifiuti?',
        answers: [
          { id: 'l24-q20-a1', text: 'Fondamentale per sicurezza e conformità', isCorrect: true },
          { id: 'l24-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l24-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l24-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  private createPsychologyQuestions(): Question[] {
    return [
      {
        id: 'l25-q1',
        lessonId: 25,
        questionNumber: 1,
        text: 'Quale è l\'importanza della psicologia nell\'assistenza?',
        answers: [
          { id: 'l25-q1-a1', text: 'Comprensione bisogni emotivi, supporto, relazione terapeutica', isCorrect: true },
          { id: 'l25-q1-a2', text: 'Solo comprensione', isCorrect: false },
          { id: 'l25-q1-a3', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q1-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q2',
        lessonId: 25,
        questionNumber: 2,
        text: 'Cosa significa empatia?',
        answers: [
          { id: 'l25-q2-a1', text: 'Capacità di comprendere le emozioni dell\'altro', isCorrect: true },
          { id: 'l25-q2-a2', text: 'Provare le stesse emozioni', isCorrect: false },
          { id: 'l25-q2-a3', text: 'Simpatia', isCorrect: false },
          { id: 'l25-q2-a4', text: 'Distanza emotiva', isCorrect: false }
        ]
      },
      {
        id: 'l25-q3',
        lessonId: 25,
        questionNumber: 3,
        text: 'Cosa significa ascolto attivo?',
        answers: [
          { id: 'l25-q3-a1', text: 'Ascoltare con attenzione, comprensione e risposta appropriata', isCorrect: true },
          { id: 'l25-q3-a2', text: 'Solo ascoltare', isCorrect: false },
          { id: 'l25-q3-a3', text: 'Ascoltare distrattamente', isCorrect: false },
          { id: 'l25-q3-a4', text: 'Non ascoltare', isCorrect: false }
        ]
      },
      {
        id: 'l25-q4',
        lessonId: 25,
        questionNumber: 4,
        text: 'Quale è l\'importanza della comunicazione non verbale?',
        answers: [
          { id: 'l25-q4-a1', text: 'Rappresenta il 70% della comunicazione', isCorrect: true },
          { id: 'l25-q4-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q4-a3', text: 'Solo decorativa', isCorrect: false },
          { id: 'l25-q4-a4', text: 'Non rilevante', isCorrect: false }
        ]
      },
      {
        id: 'l25-q5',
        lessonId: 25,
        questionNumber: 5,
        text: 'Cosa significa relazione terapeutica?',
        answers: [
          { id: 'l25-q5-a1', text: 'Relazione professionale finalizzata al benessere del paziente', isCorrect: true },
          { id: 'l25-q5-a2', text: 'Relazione amicale', isCorrect: false },
          { id: 'l25-q5-a3', text: 'Relazione formale', isCorrect: false },
          { id: 'l25-q5-a4', text: 'Relazione casuale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q6',
        lessonId: 25,
        questionNumber: 6,
        text: 'Cosa significa stress?',
        answers: [
          { id: 'l25-q6-a1', text: 'Risposta dell\'organismo a situazioni percepite come minacciose', isCorrect: true },
          { id: 'l25-q6-a2', text: 'Solo tensione', isCorrect: false },
          { id: 'l25-q6-a3', text: 'Solo ansia', isCorrect: false },
          { id: 'l25-q6-a4', text: 'Solo paura', isCorrect: false }
        ]
      },
      {
        id: 'l25-q7',
        lessonId: 25,
        questionNumber: 7,
        text: 'Cosa significa ansia?',
        answers: [
          { id: 'l25-q7-a1', text: 'Stato di preoccupazione e tensione', isCorrect: true },
          { id: 'l25-q7-a2', text: 'Stato di calma', isCorrect: false },
          { id: 'l25-q7-a3', text: 'Stato di euforia', isCorrect: false },
          { id: 'l25-q7-a4', text: 'Stato di indifferenza', isCorrect: false }
        ]
      },
      {
        id: 'l25-q8',
        lessonId: 25,
        questionNumber: 8,
        text: 'Cosa significa depressione?',
        answers: [
          { id: 'l25-q8-a1', text: 'Disturbo dell\'umore caratterizzato da tristezza persistente', isCorrect: true },
          { id: 'l25-q8-a2', text: 'Stato di felicità', isCorrect: false },
          { id: 'l25-q8-a3', text: 'Stato di ansia', isCorrect: false },
          { id: 'l25-q8-a4', text: 'Stato normale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q9',
        lessonId: 25,
        questionNumber: 9,
        text: 'Quale è l\'importanza delle dinamiche di gruppo?',
        answers: [
          { id: 'l25-q9-a1', text: 'Comprensione interazioni, collaborazione, efficacia equipe', isCorrect: true },
          { id: 'l25-q9-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q9-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l25-q9-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q10',
        lessonId: 25,
        questionNumber: 10,
        text: 'Cosa significa supporto emotivo?',
        answers: [
          { id: 'l25-q10-a1', text: 'Presenza, ascolto, comprensione, rassicurazione', isCorrect: true },
          { id: 'l25-q10-a2', text: 'Solo presenza', isCorrect: false },
          { id: 'l25-q10-a3', text: 'Solo ascolto', isCorrect: false },
          { id: 'l25-q10-a4', text: 'Nessun supporto', isCorrect: false }
        ]
      },
      {
        id: 'l25-q11',
        lessonId: 25,
        questionNumber: 11,
        text: 'Cosa significa comunicazione assertiva?',
        answers: [
          { id: 'l25-q11-a1', text: 'Comunicazione chiara, rispettosa e diretta', isCorrect: true },
          { id: 'l25-q11-a2', text: 'Comunicazione aggressiva', isCorrect: false },
          { id: 'l25-q11-a3', text: 'Comunicazione passiva', isCorrect: false },
          { id: 'l25-q11-a4', text: 'Comunicazione evasiva', isCorrect: false }
        ]
      },
      {
        id: 'l25-q12',
        lessonId: 25,
        questionNumber: 12,
        text: 'Quale è l\'importanza della gestione delle emozioni?',
        answers: [
          { id: 'l25-q12-a1', text: 'Fondamentale per relazione terapeutica e benessere', isCorrect: true },
          { id: 'l25-q12-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q12-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l25-q12-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q13',
        lessonId: 25,
        questionNumber: 13,
        text: 'Cosa significa burnout?',
        answers: [
          { id: 'l25-q13-a1', text: 'Sindrome da stress lavorativo cronico', isCorrect: true },
          { id: 'l25-q13-a2', text: 'Stato di benessere', isCorrect: false },
          { id: 'l25-q13-a3', text: 'Stato di euforia', isCorrect: false },
          { id: 'l25-q13-a4', text: 'Stato normale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q14',
        lessonId: 25,
        questionNumber: 14,
        text: 'Quale è l\'importanza della resilienza?',
        answers: [
          { id: 'l25-q14-a1', text: 'Capacità di adattarsi e superare difficoltà', isCorrect: true },
          { id: 'l25-q14-a2', text: 'Capacità di evitare difficoltà', isCorrect: false },
          { id: 'l25-q14-a3', text: 'Capacità di ignorare difficoltà', isCorrect: false },
          { id: 'l25-q14-a4', text: 'Capacità di arrendersi', isCorrect: false }
        ]
      },
      {
        id: 'l25-q15',
        lessonId: 25,
        questionNumber: 15,
        text: 'Cosa significa psicologia dello sviluppo?',
        answers: [
          { id: 'l25-q15-a1', text: 'Studio dello sviluppo psicologico nelle diverse età', isCorrect: true },
          { id: 'l25-q15-a2', text: 'Studio solo dell\'infanzia', isCorrect: false },
          { id: 'l25-q15-a3', text: 'Studio solo dell\'adolescenza', isCorrect: false },
          { id: 'l25-q15-a4', text: 'Studio solo dell\'età adulta', isCorrect: false }
        ]
      },
      {
        id: 'l25-q16',
        lessonId: 25,
        questionNumber: 16,
        text: 'Quale è l\'importanza della comunicazione con pazienti in crisi?',
        answers: [
          { id: 'l25-q16-a1', text: 'Fondamentale per rassicurazione e supporto', isCorrect: true },
          { id: 'l25-q16-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q16-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l25-q16-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q17',
        lessonId: 25,
        questionNumber: 17,
        text: 'Cosa significa supporto psicologico?',
        answers: [
          { id: 'l25-q17-a1', text: 'Assistenza emotiva e relazionale al paziente', isCorrect: true },
          { id: 'l25-q17-a2', text: 'Solo assistenza fisica', isCorrect: false },
          { id: 'l25-q17-a3', text: 'Solo assistenza medica', isCorrect: false },
          { id: 'l25-q17-a4', text: 'Nessuna assistenza', isCorrect: false }
        ]
      },
      {
        id: 'l25-q18',
        lessonId: 25,
        questionNumber: 18,
        text: 'Quale è l\'importanza della gestione del lutto?',
        answers: [
          { id: 'l25-q18-a1', text: 'Supporto fondamentale per pazienti e familiari', isCorrect: true },
          { id: 'l25-q18-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q18-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l25-q18-a4', text: 'Opzionale', isCorrect: false }
        ]
      },
      {
        id: 'l25-q19',
        lessonId: 25,
        questionNumber: 19,
        text: 'Cosa significa autostima?',
        answers: [
          { id: 'l25-q19-a1', text: 'Valutazione che una persona ha di se stessa', isCorrect: true },
          { id: 'l25-q19-a2', text: 'Valutazione degli altri', isCorrect: false },
          { id: 'l25-q19-a3', text: 'Valutazione delle capacità', isCorrect: false },
          { id: 'l25-q19-a4', text: 'Valutazione delle prestazioni', isCorrect: false }
        ]
      },
      {
        id: 'l25-q20',
        lessonId: 25,
        questionNumber: 20,
        text: 'Quale è l\'importanza della psicologia nell\'equipe sanitaria?',
        answers: [
          { id: 'l25-q20-a1', text: 'Fondamentale per collaborazione, comunicazione, benessere professionale', isCorrect: true },
          { id: 'l25-q20-a2', text: 'Poco importante', isCorrect: false },
          { id: 'l25-q20-a3', text: 'Solo formale', isCorrect: false },
          { id: 'l25-q20-a4', text: 'Opzionale', isCorrect: false }
        ]
      }
    ];
  }

  // Service methods
  getAllLessons(): Lesson[] {
    return this.lessons;
  }

  getLesson(lessonId: number): Lesson | undefined {
    return this.lessons.find(l => l.id === lessonId);
  }

  loadLesson(lessonId: number): void {
    const lesson = this.getLesson(lessonId);
    if (lesson) {
      this.currentLessonId = lessonId;
      this.currentLessonSubject.next(lesson);
      this.currentQuestionIndex = 0;
      this.loadQuestion(0);
    }
  }

  loadQuestion(index: number): void {
    const lesson = this.currentLessonSubject.value;
    if (lesson && index >= 0 && index < lesson.questions.length) {
      this.currentQuestionIndex = index;
      this.currentQuestionIndexSubject.next(index);
      this.currentQuestionSubject.next(lesson.questions[index]);
    }
  }

  getCurrentQuestion(): Question | null {
    return this.currentQuestionSubject.value;
  }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getQuestionState(questionId: string): QuestionState | undefined {
    if (!this.currentLessonId) return undefined;
    const progress = this.lessonProgressMap.get(this.currentLessonId);
    return progress?.questionStates.get(questionId);
  }

  answerQuestion(questionId: string, answerId: string): { isCorrect: boolean; shouldShowNext: boolean } {
    const question = this.getCurrentQuestion();
    if (!question || question.id !== questionId) {
      return { isCorrect: false, shouldShowNext: false };
    }

    const selectedAnswer = question.answers.find(a => a.id === answerId);
    if (!selectedAnswer) {
      return { isCorrect: false, shouldShowNext: false };
    }

    const isCorrect = selectedAnswer.isCorrect;
    const progress = this.lessonProgressMap.get(this.currentLessonId!);
    
    if (progress) {
      const existingState = progress.questionStates.get(questionId);
      const newState: QuestionState = {
        questionId: questionId,
        isAnswered: true,
        isCorrect: isCorrect,
        selectedAnswerId: answerId,
        attempts: (existingState?.attempts || 0) + 1
      };
      progress.questionStates.set(questionId, newState);
    }

    return { isCorrect: isCorrect, shouldShowNext: isCorrect };
  }

  shuffleAnswers(question: Question): Question {
    const shuffled = [...question.answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { ...question, answers: shuffled };
  }

  canGoNext(): boolean {
    const lesson = this.currentLessonSubject.value;
    return lesson ? this.currentQuestionIndex < lesson.questions.length - 1 : false;
  }

  canGoPrevious(): boolean {
    return this.currentQuestionIndex > 0;
  }

  goToNextQuestion(): void {
    if (this.canGoNext()) {
      this.loadQuestion(this.currentQuestionIndex + 1);
    }
  }

  goToPreviousQuestion(): void {
    if (this.canGoPrevious()) {
      this.loadQuestion(this.currentQuestionIndex - 1);
    }
  }

  goToQuestionByNumber(questionNumber: number): void {
    const lesson = this.currentLessonSubject.value;
    if (lesson && questionNumber >= 1 && questionNumber <= lesson.questions.length) {
      this.loadQuestion(questionNumber - 1);
    }
  }

  isQuestionCorrect(questionId: string): boolean {
    const state = this.getQuestionState(questionId);
    return state?.isCorrect ?? false;
  }

  isQuestionAnswered(questionId: string): boolean {
    const state = this.getQuestionState(questionId);
    return state?.isAnswered ?? false;
  }
}